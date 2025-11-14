# AI 心理咨询与运动计划平台

一个基于AI的心理健康服务平台，提供心理咨询、个性化锻炼计划、健康评估等功能。

![心灵伴侣 - AI心理咨询服务系统](APC_v2.0/demo/296ba1b0a8c037a855e536e8f7d98267.png)

## 🌟 功能特性

- 用户认证系统（注册、登录、游客访问）
- AI驱动的心理咨询服务
- 个性化锻炼计划生成与管理
- 身体和心理状态评估
- 身体测量数据追踪
- 管理员功能（用户管理、登录日志查看）

## 🔧 技术栈

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/) Web框架
- [Sequelize ORM](https://sequelize.org/) 数据库操作
- [MySQL](https://www.mysql.com/) 数据库
- [JWT](https://jwt.io/) 用户认证
- [Axios](https://axios-http.com/) HTTP客户端
- AI集成（可配置MindChat、GLM等模型）

## 📋 环境要求

- Node.js >= 16
- MySQL >= 5.7
- npm 或 yarn

## 🚀 快速启动

### 1. 安装依赖
```bash
# 在项目根目录安装依赖（推荐）
npm install
```

### 2. 配置环境变量
创建 `.env` 文件：
```env
PORT=3000
JWT_SECRET=your-secret-key-here
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=ai_psychology_platform

# 可选：接入 GLM AI
GLM_API_BASE=https://open.bigmodel.cn/api/paas/v4
GLM_API_KEY=your-glm-api-key
GLM_MODEL=glm-4
```

### 3. 初始化数据库
1. 启动 MySQL 服务
2. 创建数据库：`CREATE DATABASE ai_psychology_platform;`

### 4. 启动服务
```bash
# 在项目根目录启动（推荐）
npm run dev
```
服务将在 `http://localhost:3000` 启动

### 5. 初始化管理员（可选）
```bash
npm run seed:admin
```
默认管理员账号：
- 用户名：admin
- 邮箱：admin@example.com  
- 密码：ChangeMe123!
- 角色：super_admin

## 📖 主要页面

- 首页：[index.html](APC_v2.0/demo/index.html)
- AI心理咨询师：[ai-counselor.html](APC_v2.0/demo/ai-counselor.html)
- 认知重构训练：[cognitive-restructuring.html](APC_v2.0/demo/cognitive-restructuring.html)
- 情绪追踪：[emotion-tracking.html](APC_v2.0/demo/emotion-tracking.html)
- 冥想练习：[meditation.html](APC_v2.0/demo/meditation.html)
- 心理测试：[psychological-tests.html](APC_v2.0/demo/psychological-tests.html)
- 知识库：[knowledge-base.html](APC_v2.0/demo/knowledge-base.html)
- 个人资料：[profile.html](APC_v2.0/demo/profile.html)
- 联系我们：[contact-us.html](APC_v2.0/demo/contact-us.html)
- 帮助中心：[help-center.html](APC_v2.0/demo/help-center.html)

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 启动带调试功能的开发服务器
npm run dev:debug

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 初始化管理员账户
npm run seed:admin
```

## 📁 项目结构

```
APC_v2.0/
├── demo/                    # 主要开发目录
│   ├── src/                 # TypeScript源代码
│   │   └── app.ts           # 应用主入口文件
│   ├── migrations/          # 数据库迁移文件
│   ├── dist/                # 编译后的JavaScript文件
│   ├── index.html           # 前端主页面
│   └── ...                  # 其他配置和资源文件
├── package.json             # 项目根目录配置文件
└── tsconfig.json            # 根目录TypeScript配置
```

注意：项目依赖项已统一在根目录的 package.json 中管理，避免重复安装 node_modules。

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解更多详情。