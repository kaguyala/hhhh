# AI 心理咨询与运动计划平台

一个基于AI的心理健康服务平台，提供心理咨询、个性化锻炼计划、健康评估等功能。

![心灵伴侣 - AI心理咨询服务系统](APC_v2.0/demo/296ba1b0a8c037a855e536e8f7d98267.png)

## 🌟 项目简介

这是一个AI驱动的心理健康服务平台，旨在为用户提供：
- 24小时在线心理咨询服务
- 个性化的情绪管理和锻炼计划
- 心理状态跟踪和分析
- 丰富的心理健康知识库

无论你是想要倾诉内心困扰，还是希望改善情绪状态，或是寻求专业的心理健康指导，这个平台都能为你提供帮助。

## ⚠️ 重要提示

根据用户偏好设置，**本项目推荐使用 Windows 命令提示符(cmd) 而非 PowerShell 来执行命令**。在包含中文字符的路径下，PowerShell可能会出现解析问题，而cmd对中文路径支持更稳定。

## 🚀 快速开始（适合初学者）

### 第一步：准备工作

在开始之前，请确保你的电脑上已经安装了以下软件：

1. **Node.js** (版本14或更高)
   - 访问 [Node.js官网](https://nodejs.org/zh-cn/download/) 下载并安装
   - 安装完成后，在命令行中输入 `node --version` 验证是否安装成功

2. **MySQL数据库** (版本5.7或更高)
   - 推荐使用 [XAMPP](https://www.apachefriends.org/zh_cn/index.html) (内置MySQL)
   - 或者单独安装 [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
   - 启动MySQL服务

### 第二步：下载项目

1. 点击页面右上角的绿色"Code"按钮
2. 选择"Download ZIP"下载项目压缩包
3. 解压到你容易找到的位置，比如桌面

### 第三步：配置环境

1. 打开解压后的文件夹，进入 `APC_v2.0/demo` 目录
2. 将 `.env.example` 文件复制一份并重命名为 `.env`
3. 用文本编辑器打开 `.env` 文件，修改以下配置：
   ```
   # 数据库配置 (请根据你的MySQL配置修改)
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=apc_db
   DB_USER=你的MySQL用户名
   DB_PASSWORD=你的MySQL密码
   
   # JWT密钥 (可以保持不变)
   JWT_SECRET=7ZxQ#9kP2!rT5wG8mB3vF6jH1nD4sK7pA0lC2dE5gR8tY1uI3oP6zX9cV2bN5mK8pQ1sT4wG7jZ3
   ```

### 第四步：安装依赖

1. 按住 `Shift` 键并右键点击 `APC_v2.0/demo` 文件夹
2. 选择"在此处打开命令窗口"(重要：请选择"命令提示符"而不是PowerShell)
3. 输入以下命令并按回车：
   ```cmd
   npm install
   ```

### 第五步：初始化数据库

在同一个命令窗口中，运行以下命令：
```cmd
node init-database.js
```

### 第六步：启动服务

运行以下命令启动服务器：
```cmd
node start.js
```

如果一切正常，你会看到类似这样的输出：
```
开始一键启动流程...
.env 配置文件已存在
正在初始化数据库...
数据库初始化完成
正在启动服务器...
服务器启动完成！请访问 http://localhost:3000
```

### 第七步：访问平台

打开浏览器，访问 [http://localhost:3000](http://localhost:3000) 即可开始使用平台。

系统提供了测试账号：
- 用户名：testuser
- 密码：testpassword

## 📖 主要功能页面

- 首页：[index.html](APC_v2.0/demo/index.html) - 平台入口
- AI心理咨询师：[ai-counselor.html](APC_v2.0/demo/ai-counselor.html) - 与AI心理咨询师对话
- 认知重构训练：[cognitive-restructuring.html](APC_v2.0/demo/cognitive-restructuring.html) - 认知行为疗法训练
- 情绪追踪：[emotion-tracking.html](APC_v2.0/demo/emotion-tracking.html) - 记录和分析情绪变化
- 冥想练习：[meditation.html](APC_v2.0/demo/meditation.html) - 放松冥想练习
- 心理测试：[psychological-tests.html](APC_v2.0/demo/psychological-tests.html) - 专业心理测评
- 知识库：[knowledge-base.html](APC_v2.0/demo/knowledge-base.html) - 心理健康知识查阅
- 个人资料：[profile.html](APC_v2.0/demo/profile.html) - 个人信息管理

## 🔧 技术栈

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/) Web框架
- [Sequelize ORM](https://sequelize.org/) 数据库操作
- [MySQL](https://www.mysql.com/) 数据库
- [JWT](https://jwt.io/) 用户认证
- [Axios](https://axios-http.com/) HTTP客户端
- AI集成（可配置MindChat、GLM等模型）

## 📋 环境要求

- Node.js >= 14
- MySQL >= 5.7
- Windows 7+/macOS 10.12+/Linux内核2.6+

## ❓ 常见问题

### Q: 如何修改服务端口？
在 [.env](APC_v2.0/demo/.env.example) 文件中添加一行 `PORT=新端口号`，例如：
```
PORT=3001
```

### Q: 忘记了管理员密码怎么办？
可以通过运行以下命令重置管理员账户：
```cmd
npm run seed:admin
```

### Q: 如何接入真实的AI模型？
在 [.env](APC_v2.0/demo/.env.example) 文件中配置相应的API密钥：
```
# GLM系列模型
ZHIPUAI_API_KEY=你的智谱AI密钥

# 阿里通义千问系列模型
DASHSCOPE_API_KEY=你的阿里云密钥
```

### Q: 出现端口占用问题怎么办？
如果3000端口已被占用，可以修改端口或者结束占用进程：
```cmd
# 查看哪个进程占用了3000端口
netstat -ano | findstr :3000

# 根据PID结束进程（将<PID>替换为实际的进程号）
taskkill /PID <PID> /F
```

## 🛠️ 开发命令

```cmd
# 启动开发服务器（支持热更新）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 初始化管理员账户
npm run seed:admin

# 初始化数据库
npm run init:db

# 一键启动（自动配置环境并启动服务器）
npm run setup
```