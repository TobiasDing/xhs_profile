# 车车Home - Media Kit 个人主页

一个具有法式复古风格的个人 Media Kit 网页，采用 React + TypeScript + Vite + Tailwind CSS + Framer Motion 构建。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 3
- **动画**: Framer Motion
- **图标**: Lucide React

## 项目特点

- 🎨 法式复古风格设计，奶油米色配色
- 📱 响应式布局，支持 PC 和移动端
- ✨ 优雅的动画效果（淡入、悬停、滚动动画）
- 🖼️ 图片完整展示，无裁切
- 📊 数据可视化展示

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 9.0 或更高版本

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:8080

### 构建生产版本

```bash
npm run build
```

构建后的文件位于 `dist/` 目录

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
frontend-react/
├── public/              # 静态资源
│   ├── avatar.webp      # 头像
│   ├── xiaohongshu.png  # 小红书图标
│   ├── douyin.png       # 抖音图标
│   └── *.jpg            # 展示图片
├── src/
│   ├── pages/           # 页面组件
│   │   └── BloggerProfile.tsx  # 主页
│   ├── App.tsx          # 应用入口
│   ├── main.tsx         # 渲染入口
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
├── package.json         # 依赖配置
├── tailwind.config.js   # Tailwind 配置
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 依赖说明

### 生产依赖
- `react` ^19.2.0 - React 核心库
- `react-dom` ^19.2.0 - React DOM 渲染
- `framer-motion` ^12.35.0 - 动画库
- `lucide-react` ^0.577.0 - 图标库

### 开发依赖
- `vite` ^7.3.1 - 构建工具
- `typescript` ~5.9.3 - TypeScript 支持
- `tailwindcss` ^3.4.19 - CSS 框架
- `autoprefixer` ^10.4.27 - CSS 前缀处理
- `postcss` ^8.5.8 - CSS 处理工具
- `eslint` ^9.39.1 - 代码检查
- `@vitejs/plugin-react` ^5.1.1 - Vite React 插件

## 配色方案

- **主背景**: `#F5F5DC` (奶油米色)
- **深色背景**: `#4B3621` (深棕色)
- **文字**: `#4B3621` (深棕色)
- **强调色**: `#8B7355` (浅棕色)

## 响应式断点

- **PC 端**: > 1024px (三栏布局)
- **平板**: 768px - 1024px
- **移动端**: < 768px (单列堆叠)

## 部署

构建后的 `dist/` 目录可以部署到任何静态托管服务：
- GitHub Pages
- Vercel
- Netlify
- 阿里云 OSS
- 腾讯云 COS

## 许可证

MIT License
