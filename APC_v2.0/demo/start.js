#!/usr/bin/env node

/**
 * 一键启动脚本
 * 自动配置环境并启动服务器
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查并创建 .env 文件
function checkEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');
  
  if (!fs.existsSync(envPath)) {
    console.log('未找到 .env 配置文件，正在从 .env.example 创建默认配置...');
    
    if (fs.existsSync(envExamplePath)) {
      // 复制 .env.example 到 .env
      fs.copyFileSync(envExamplePath, envPath);
      console.log('已创建默认 .env 文件，请根据需要修改配置');
    } else {
      // 创建基本的 .env 文件
      const defaultEnvContent = `# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=apc_db
DB_USER=apc_user
DB_PASSWORD=secure_password_123

# JWT密钥 (请替换为更强的密钥)
JWT_SECRET=7ZxQ#9kP2!rT5wG8mB3vF6jH1nD4sK7pA0lC2dE5gR8tY1uI3oP6zX9cV2bN5mK8pQ1sT4wG7jZ3

# AI服务API密钥（用于真实AI模型）
# DASHSCOPE_API_KEY=your_dashscope_api_key_here
# ZHIPUAI_API_KEY=your_zhipuai_api_key_here
`;
      fs.writeFileSync(envPath, defaultEnvContent);
      console.log('已创建基本的 .env 配置文件');
    }
  } else {
    console.log('.env 配置文件已存在');
  }
}

// 运行数据库初始化
function initDatabase() {
  return new Promise((resolve, reject) => {
    console.log('正在初始化数据库...');
    
    const initProcess = spawn('node', ['init-database.js'], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    initProcess.on('close', (code) => {
      if (code === 0) {
        console.log('数据库初始化完成');
        resolve();
      } else {
        console.error('数据库初始化失败，退出码:', code);
        reject(new Error('数据库初始化失败'));
      }
    });
    
    initProcess.on('error', (error) => {
      console.error('启动数据库初始化脚本时出错:', error);
      reject(error);
    });
  });
}

// 启动服务器
function startServer() {
  console.log('正在启动服务器...');
  
  const serverProcess = spawn('node', ['simple-server.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  serverProcess.on('close', (code) => {
    console.log('服务器已停止，退出码:', code);
  });
  
  serverProcess.on('error', (error) => {
    console.error('启动服务器时出错:', error);
  });
}

// 主函数
async function main() {
  try {
    console.log('开始一键启动流程...');
    
    // 检查环境配置文件
    checkEnvFile();
    
    // 初始化数据库
    await initDatabase();
    
    // 启动服务器
    startServer();
    
    console.log('服务器启动完成！请访问 http://localhost:3000');
  } catch (error) {
    console.error('启动过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();