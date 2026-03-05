# 车车Home - Media Kit & 需求管理系统

一个具有法式复古风格的个人 Media Kit 网页，以及项目需求管理系统。采用 React + TypeScript + Vite + Tailwind CSS + Framer Motion 构建。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 3
- **动画**: Framer Motion
- **图标**: Lucide React
- **路由**: React Router DOM 7

## 项目特点

### Media Kit 主页
- 🎨 法式复古风格设计，奶油米色配色
- 📱 响应式布局，支持 PC 和移动端
- ✨ 优雅的动画效果（淡入、悬停、滚动动画）
- 🖼️ 图片完整展示，无裁切
- 📊 数据可视化展示
- 👤 博主信息卡片（含联系方式、社交链接）

### 需求管理系统
- 📋 需求列表（CRUD 操作）
- 🔄 工作流节点管理
- ⏱️ 工时记录
- 📝 大纲详情与批注功能
- 🏷️ 标签管理

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
├── public/                    # 静态资源
│   ├── avatar.webp            # 头像
│   ├── xiaohongshu.png        # 小红书图标
│   ├── douyin.png             # 抖音图标
│   └── *.jpg                  # 展示图片
├── src/
│   ├── pages/                 # 页面组件
│   │   ├── BloggerProfile.tsx    # Media Kit 主页
│   │   ├── Requirements.tsx      # 需求列表页
│   │   ├── RequirementDetail.tsx # 需求详情页（含工作流）
│   │   └── OutlineDetail.tsx     # 大纲详情页（含批注）
│   ├── App.tsx                # 应用入口（含路由配置）
│   ├── main.tsx               # 渲染入口
│   └── index.css              # 全局样式
├── index.html                 # HTML 模板
├── package.json               # 依赖配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── vite.config.ts             # Vite 配置
```

## 路由说明

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | BloggerProfile | Media Kit 个人主页 |
| `/profile` | BloggerProfile | 合作指南页面 |
| `/requirements` | Requirements | 需求列表页 |
| `/requirement/:id` | RequirementDetail | 需求详情页（工作流管理） |
| `/outline/:id` | OutlineDetail | 大纲详情页（批注功能） |

## 依赖说明

### 生产依赖
- `react` ^19.2.0 - React 核心库
- `react-dom` ^19.2.0 - React DOM 渲染
- `react-router-dom` ^7.13.1 - 路由管理
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
- **成功**: `#52c41a` (绿色)
- **警告**: `#faad14` (黄色)
- **错误**: `#ff4d4f` (红色)

## 功能说明

### 需求列表页 (Requirements)
- 表格展示所有需求
- 支持按状态、体裁、类型筛选
- 新建需求（弹窗表单）
- 删除需求（确认对话框）
- 点击行进入详情页

### 需求详情页 (RequirementDetail)
- 工作流节点可视化展示
- 节点状态：待处理/进行中/已完成
- 完成节点（需前置节点已完成）
- 取消完成（后续节点未完成时）
- 工时记录（特定节点）
- 提报信息表单

### 大纲详情页 (OutlineDetail)
- 标题与备选标题（可切换）
- 正文内容展示
- 标签管理（支持添加新标签）
- 图片展示与批注
- 文本批注功能（选中文本添加批注）
- 批注列表与编辑
- 博主信息悬浮卡片

## 开发注意事项

1. **PowerShell 执行策略**: 如果遇到 npm 无法运行，请以管理员身份执行：
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
   ```

2. **端口占用**: 如果 8080 端口被占用，Vite 会自动尝试其他端口

3. **热更新**: 开发模式下修改代码会自动刷新浏览器

## 部署

构建后的 `dist/` 目录可以部署到任何静态文件服务器：
- GitHub Pages
- Vercel
- Netlify
- 自有服务器

---

**作者**: 车车Home  
**小红书**: https://www.xiaohongshu.com/user/profile/682b5d95000000000e01e2eb  
**抖音**: https://www.douyin.com/user/MS4wLjABAAAAMxZyvrW3HPElgbQcJArwcH_K5osAEQxhLGng2F-TgMKx-S550GX5TK0B7cvTP5tX
