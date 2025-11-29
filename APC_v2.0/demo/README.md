# AI 心理咨询与运动计划平台 v2.0

一个基于AI的心理健康服务平台，提供7x24小时的心理健康支持和个性化健康管理服务。

## 🌟 功能特性

- 用户认证系统（注册、登录、游客访问）
- AI驱动的心理咨询服务（基于大语言模型）
- 个性化锻炼计划生成与管理
- 身心健康状态评估
- 身体测量数据追踪
- 用户协议管理
- 个人信息管理
- 基于JWT的身份验证

## 🔧 技术栈

- 后端：[Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- 数据库：[MySQL](https://www.mysql.com/) + [Sequelize ORM](https://sequelize.org/)
- 前端：HTML + CSS + JavaScript（无框架）
- AI服务：支持多种大语言模型（GLM、MindChat等）
- 用户认证：JWT (JSON Web Tokens)
- HTTP客户端：[Axios](https://axios-http.com/)

## 📋 环境要求

- Node.js >= 16
- MySQL >= 5.7
- npm 或 yarn

## 📁 项目结构

```
APC_v2.0/demo/
├── src/                    # TypeScript源代码
│   ├── app.ts             # 应用主入口文件
│   ├── models/            # 数据库模型
│   ├── aiService.ts       # AI服务接口
│   └── types/             # TypeScript类型定义
├── migrations/            # 数据库迁移文件
├── *.html                 # 前端页面文件
├── package.json           # 项目配置和脚本
├── .env                   # 环境变量配置
├── .env.example           # 环境变量配置示例
└── ...                    # 其他配置和资源文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装项目依赖
npm install
```

### 2. 数据库设置

#### 自动设置（推荐）

1. 复制并配置环境变量文件：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，配置数据库连接信息：
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=apc_test_db
   DB_USER=apc_test_user
   DB_PASSWORD=test_password
   DB_ROOT_PASSWORD=your_root_password  # 可选，用于自动创建数据库和用户
   
   JWT_SECRET=your-jwt-secret-key
   ```

3. 运行数据库初始化脚本：
   ```bash
   npm run init:db
   ```

#### 手动设置

参考 [DATABASE_SETUP.md](DATABASE_SETUP.md) 文件进行手动数据库设置。

### 3. 启动开发服务器

```bash
# 启动开发服务器
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

如果端口被占用，可以先杀死占用进程：
```bash
# 查找占用3000端口的进程
netstat -ano | findstr :3000

# 杀死进程（替换<PID>为实际的进程ID）
taskkill /PID <PID> /F
```

## 📖 API 接口

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/guest` - 游客访问

### 用户相关
- `GET /api/users/profile` - 获取用户信息
- `PUT /api/users/profile` - 更新用户信息
- `POST /api/users/agree-to-terms` - 同意用户协议

### AI咨询相关
- `POST /api/consultations/` - 创建咨询会话
- `GET /api/consultations/` - 获取用户咨询历史
- `POST /api/ai/chat` - 与AI对话

### 健康数据相关
- `GET /api/measurements/` - 获取身体测量数据
- `POST /api/measurements/` - 创建身体测量记录
- `PUT /api/measurements/:id` - 更新身体测量记录
- `DELETE /api/measurements/:id` - 删除身体测量记录

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 初始化数据库
npm run init:db

# 运行测试
npm test
```

## ⚙️ 环境变量配置

项目使用以下环境变量：

| 变量名 | 描述 | 是否必需 |
|--------|------|---------|
| DB_HOST | 数据库主机地址 | 是 |
| DB_PORT | 数据库端口 | 是 |
| DB_NAME | 数据库名 | 是 |
| DB_USER | 数据库用户名 | 是 |
| DB_PASSWORD | 数据库密码 | 是 |
| DB_ROOT_PASSWORD | 数据库root用户密码（用于自动创建数据库和用户） | 否 |
| JWT_SECRET | JWT密钥 | 是 |
| ZHIPUAI_API_KEY | 智谱AI API密钥（用于GLM模型） | 否 |
| DASHSCOPE_API_KEY | 通义千问API密钥 | 否 |

## 🧪 测试

使用Jest进行单元测试和集成测试。

```bash
# 运行所有测试
npm test

# 运行测试并监听文件变化
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

## 🚢 部署

构建项目并运行生产服务器：

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📄 许可证

[MIT](LICENSE)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 🆘 故障排除

### 数据库连接问题

1. 检查MySQL服务是否运行
2. 验证环境变量配置是否正确
3. 确认数据库用户权限是否正确

### 启动端口冲突

如果3000端口被占用，请按照"快速开始"中的说明杀死占用进程或修改端口。

### 时间戳字段错误

如果遇到类似 `Unknown column 'created_at' in 'field list'` 的错误，请检查数据库表结构是否与模型定义匹配。项目已修复时间戳字段映射问题，确保使用最新代码。
