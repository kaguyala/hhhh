# 项目部署与一键启动指南

本文档介绍了如何打包和部署AI心理咨询服务系统，以及如何使用一键启动功能。

## 项目打包

要将项目打包发送给他人，请包含以下文件和目录：

```
demo/
├── .env.example              # 环境变量示例文件
├── package.json              # 项目依赖和脚本配置
├── package-lock.json         # 依赖版本锁定文件
├── simple-server.js          # 主服务器文件
├── init-database.js          # 数据库初始化脚本
├── start.js                  # 一键启动脚本
├── DEPLOYMENT.md             # 部署说明文档
├── DATABASE_SETUP.md         # 数据库设置详细说明
├── src/                      # TypeScript源代码
│   ├── app.ts
│   ├── aiService.ts
│   └── models/
│       ├── index.ts
│       └── user.ts
├── migrations/               # 数据库迁移文件
│   └── 20251026172500-fix-consultation-user-id.js
├── *.html                    # 所有HTML页面文件
└── README.md                 # 项目说明文档
```

## 一键启动功能

项目提供了一键启动功能，可以自动配置环境并启动服务器。

### 使用方法

1. 确保已安装 Node.js (版本 >= 14) 和 MySQL 服务
2. 解压项目文件到目标目录
3. 在项目根目录（demo目录）下运行以下命令：

```bash
# 安装项目依赖
npm install

# 一键启动（自动配置环境并启动服务器）
npm run setup
```

### 启动过程说明

一键启动脚本会执行以下操作：

1. 检查是否存在 `.env` 配置文件，如果不存在则从 `.env.example` 复制创建
2. 运行数据库初始化脚本，自动创建数据库和用户
3. 启动服务器并监听指定端口（默认3000）

### 配置文件说明

#### .env 配置文件

`.env` 文件包含了项目运行所需的所有环境变量配置：

```env
# 数据库配置
DB_HOST=localhost           # 数据库主机地址
DB_PORT=3306               # 数据库端口
DB_NAME=apc_db             # 数据库名称
DB_USER=apc_user           # 数据库用户名
DB_PASSWORD=secure_password_123  # 数据库密码

# JWT密钥 (用于用户认证)
JWT_SECRET=your_jwt_secret_key_here

# AI服务API密钥（可选）
DASHSCOPE_API_KEY=your_dashscope_api_key_here
ZHIPUAI_API_KEY=your_zhipuai_api_key_here
```

如果需要自定义配置，请在运行一键启动前修改 `.env` 文件。

## 手动启动方式

如果不使用一键启动功能，也可以手动启动项目：

```bash
# 1. 安装依赖
npm install

# 2. 初始化数据库（可选，如果需要使用MySQL数据库）
npm run init:db

# 3. 启动服务器
npm start
```

## 访问应用

启动成功后，可以通过以下地址访问应用：
- 主页: http://localhost:3000
- 默认测试用户: 
  - 用户名: testuser
  - 密码: testpassword

## 故障排除

### 数据库连接问题

如果遇到数据库连接问题，请检查：
1. MySQL服务是否正在运行
2. `.env` 文件中的数据库配置是否正确
3. 数据库用户是否具有正确的权限

### 端口占用问题

如果3000端口已被占用，可以通过设置 PORT 环境变量来更改端口：

```bash
# Windows (cmd)
set PORT=3001 && npm start

# Windows (PowerShell)
$env:PORT="3001"; npm start

# macOS/Linux
PORT=3001 npm start
```

## 开发相关

如果需要进行开发工作，可以使用以下命令：

```bash
# 启动开发服务器（支持热重载）
npm run dev

# 构建TypeScript代码
npm run build

# 运行测试
npm test
```