#!/usr/bin/env node

/**
 * 数据库初始化脚本
 * 自动创建数据库、用户并授予权限
 */

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// 加载环境变量
dotenv.config({ path: path.join(__dirname, '.env') });

// 从环境变量获取数据库配置
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || 'apc_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD || ''; // 可选的root密码

console.log('数据库初始化脚本启动...');
console.log('配置信息:');
console.log('- 主机:', DB_HOST);
console.log('- 端口:', DB_PORT);
console.log('- 数据库名:', DB_NAME);
console.log('- 用户名:', DB_USER);
// 不显示密码
console.log('- 密码: [HIDDEN]');

async function initDatabase() {
  let connection;
  
  try {
    console.log('\n1. 连接到MySQL服务器...');
    
    // 首先尝试使用配置的用户连接
    try {
      connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD
      });
      console.log('✓ 使用配置用户连接成功');
    } catch (userError) {
      console.log('✗ 使用配置用户连接失败，尝试使用root用户...');
      console.log('Root密码:', DB_ROOT_PASSWORD ? '[PROVIDED]' : '[NOT PROVIDED]');
      
      // 如果配置用户连接失败，尝试使用root用户
      try {
        connection = await mysql.createConnection({
          host: DB_HOST,
          port: DB_PORT,
          user: 'root',
          password: DB_ROOT_PASSWORD
        });
        console.log('✓ 使用root用户连接成功');
      } catch (rootError) {
        console.error('✗ 使用root用户连接也失败:', rootError.message);
        console.log('\n请确保：');
        console.log('1. MySQL服务正在运行');
        console.log('2. 提供的数据库连接信息正确');
        console.log('3. root用户密码正确（如果需要）');
        throw new Error('无法连接到MySQL服务器');
      }
    }
    
    console.log('\n2. 检查数据库是否存在...');
    const [dbResults] = await connection.execute(
      'SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?',
      [DB_NAME]
    );
    
    if (dbResults.length > 0) {
      console.log(`✓ 数据库 ${DB_NAME} 已存在`);
    } else {
      console.log(`→ 创建数据库 ${DB_NAME}...`);
      await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
      console.log(`✓ 数据库 ${DB_NAME} 创建成功`);
    }
    
    console.log('\n3. 检查用户是否存在...');
    try {
      const [userResults] = await connection.execute(
        'SELECT User, Host FROM mysql.user WHERE User = ?',
        [DB_USER]
      );
      
      if (userResults.length > 0) {
        console.log(`✓ 用户 ${DB_USER} 已存在`);
      } else {
        console.log(`→ 创建用户 ${DB_USER}...`);
        // MySQL 8.0+ 使用新的认证插件
        try {
          await connection.execute(
            `CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED WITH mysql_native_password BY ?`,
            [DB_USER, DB_PASSWORD]
          );
        } catch (e) {
          // 如果上面的方法失败，尝试传统方法
          await connection.execute(
            `CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED BY ?`,
            [DB_USER, DB_PASSWORD]
          );
        }
        console.log(`✓ 用户 ${DB_USER} 创建成功`);
      }
    } catch (error) {
      console.log('⚠️  用户检查/创建过程中出现警告（可能没有足够权限），将继续执行...');
    }
    
    console.log('\n4. 授予用户权限...');
    try {
      await connection.execute(`GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO ?@'%'`, [DB_USER]);
      await connection.execute('FLUSH PRIVILEGES');
      console.log(`✓ 用户 ${DB_USER} 已获得数据库 ${DB_NAME} 的所有权限`);
    } catch (error) {
      console.log('⚠️  权限授予过程中出现警告（可能没有足够权限），将继续执行...');
    }
    
    console.log('\n5. 测试数据库连接...');
    const testConnection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });
    
    await testConnection.execute('SELECT 1');
    await testConnection.end();
    console.log('✓ 数据库连接测试成功');
    
    await connection.end();
    
    console.log('\n🎉 数据库初始化完成！');
    console.log('\n请确保你的 .env 文件包含以下配置:');
    console.log('\n# 数据库配置');
    console.log(`DB_HOST=${DB_HOST}`);
    console.log(`DB_PORT=${DB_PORT}`);
    console.log(`DB_NAME=${DB_NAME}`);
    console.log(`DB_USER=${DB_USER}`);
    console.log(`DB_PASSWORD=${DB_PASSWORD}`);
    
  } catch (error) {
    console.error('\n❌ 数据库初始化过程中出现错误:');
    console.error('错误信息:', error.message);
    
    if (connection) {
      await connection.end().catch(() => {});
    }
    
    // 如果是权限错误，给出更友好的提示
    if (error.message.includes('Access denied') || error.message.includes('ER_ACCESS_DENIED_ERROR')) {
      console.log('\n💡 提示:');
      console.log('   如果您看到权限相关的错误，请尝试以下解决方案:');
      console.log('   1. 确保提供了正确的root密码 (DB_ROOT_PASSWORD)');
      console.log('   2. 或者手动创建数据库和用户，然后更新.env文件');
      console.log('   3. 参考 DATABASE_SETUP.md 文件了解更多手动设置方法');
    }
    
    process.exit(1);
  }
}

// 只有在直接运行此脚本时才执行初始化
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };