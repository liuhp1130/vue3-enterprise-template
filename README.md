# 🚀 vue3-enterprise-template

一个面向 **中大型前端项目** 的工程化模板，  
基于 Vite + Vue3 + TypeScript，
聚焦 **构建体系、工程规范、性能优化与自动化能力**，  
用于解决真实业务中「项目可维护性差、构建体积大、性能不可控」等问题。
内置规范、性能优化与自动化能力。



---

## 🧱 技术栈

- **Vite**：现代前端构建工具  
- **Vue 3 + TypeScript**
- **Pinia / Vue Router**
- **ESLint + Prettier**
- **Husky + Commitlint**
- **Rollup（生产构建）**
- **Nginx（部署示例）**

---

## 📦 功能特性

- ⚡ 极速开发体验（Vite + ESM）
- 🧩 模块化工程结构
- 🛡 完整代码规范与提交规范
- 🚀 多环境配置（dev / test / prod）
- 📈 构建性能优化（分包、懒加载）
- 🤖 自动化构建与部署支持
---

## 📁 项目结构设计

```txt
├─ build/                # 构建配置拆分（工程化核心）
│  ├─ vite.base.ts
│  ├─ vite.dev.ts
│  ├─ vite.prod.ts
│  └─ vite.plugins.ts
│
├─ src/
│  ├─ api/               # 接口统一管理
│  ├─ components/        # 通用组件
│  ├─ hooks/             # 通用 hooks
│  ├─ router/            # 路由与权限控制
│  ├─ store/             # 状态管理
│  ├─ utils/             # 工具函数
│  └─ views/             # 页面级组件

```

---






## ✨ 为什么要做这个项目？

在实际业务开发中，前端项目常见问题包括：

- 构建配置混乱，环境区分不清
- 构建产物体积不可控，缺乏分析手段
- 代码规范依赖人为约束，难以统一
- 资源体积大，首屏加载慢

📌 构建配置与业务代码彻底解耦，避免配置文件膨胀

👉 本项目以 **工程化视角** 出发，  
提供一套 **可落地、可扩展、可复用** 的解决方案。

---




## ⚙️ 构建体系设计（核心亮点）
### 多环境构建

- .env.development

- .env.test
- .env.production

通过 --mode 自动加载对应环境变量，
避免硬编码与环境混用问题。

### 构建配置拆分

- 基础配置：通用 alias、插件体系

- 开发配置：dev server、proxy

- 生产配置：分包、体积控制、优化策略

通过 mergeConfig 组合配置，
提高构建体系的可维护性与扩展性。

### 📊 构建产物分析（数据驱动）

在生产构建阶段引入 rollup-plugin-visualizer：

- 可视化分析构建依赖关系

- 定位大体积依赖

- 辅助制定分包策略

#### 分包策略示例

- Vue 生态独立 chunk（runtime-core / runtime-dom）

- 提高缓存命中率

- 减少业务更新对基础库缓存的影响

###  🚀 性能优化方案
1️⃣ Vue 运行时代码裁剪

- 关闭 Options API

- 关闭生产环境 DevTools

- 减少不必要的运行时代码进入生产包

2️⃣ gzip / brotli 双压缩方案

- 构建阶段生成 .gz / .br 文件

- Nginx 根据浏览器 Accept-Encoding 自动返回最优格式

- 采用 预压缩 降低服务器运行时 CPU 开销

#### 实际效果（示例）
| 资源类型 |	原始体积	|gzip	|brotli| 
|----|----|----|----|
|JS Bundle|	48 KB|	15 KB|	11 KB|

📌 实际传输体积下降约 70%+

---

### 🧪 本地开发
```
npm install
npm run dev
```

### 🏗 生产构建

```
npm run build
```

构建阶段将自动：

- 进行 TypeScript 类型校验

- 生成构建分析报告

- 输出 gzip / brotli 压缩资源

### 🌐 Nginx 部署示例（简化）

```nginx
gzip on;
brotli on;
brotli_static on;
```

📌 支持现代浏览器优先使用 brotli。

### 🧠 工程化设计思考

- 构建配置即代码，需要可维护、可演进

- 优化应基于分析与数据，而非经验

- 工程化的目标是 提升长期开发效率与稳定性

### 📌 适用场景

- 中大型前端项目

- 企业级后台系统

- 需要长期维护的业务项目

- 前端工程化实践与学习