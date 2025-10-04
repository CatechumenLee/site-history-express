# Site History Express v1.3.0 - 全局历史记录版本

## 🎉 主要更新

### ✨ 新功能：全局历史记录显示
- **核心改进**：无论在哪个网站点击扩展图标，都显示所有网站的浏览历史记录
- **简化体验**：移除了基于当前域名的过滤逻辑，提供一致的浏览体验
- **保持优化**：保留了原有的搜索、键盘快捷键和虚拟滚动功能

### 🗑️ 功能移除
- 移除了域名匹配模式切换功能（严格模式/宽松模式）
- 简化了过滤栏界面，移除了模式切换按钮
- 简化了相关的状态管理逻辑

### 📝 界面更新
- 更新了 README 文件，默认显示中文版本
- 添加了全局历史记录版本的详细说明
- 优化了安装指南和开发文档

### 🐛 性能优化
- 优化了历史记录加载逻辑
- 简化了数据处理流程，提升了响应速度
- 改进了内存使用效率

## 📦 安装方式

### 方式一：直接安装 CRX 文件
1. 下载 `site-history-express-v1.3.0.crx` 文件
2. 在 Chrome 浏览器中打开 `chrome://extensions/`
3. 启用"开发者模式"
4. 将 `.crx` 文件拖拽到扩展页面中

### 方式二：从源码构建
```bash
git clone https://github.com/CatechumenLee/site-history-express.git
cd site-history-express
npm install
npm run build
```

## 🔧 技术细节

### 代码变更
- `src/background/index.ts`: 新增 `createGlobalHistoryItems()` 函数
- `src/popup/App.tsx`: 简化历史记录显示逻辑
- `src/popup/component/FilterBar/index.tsx`: 移除匹配模式切换
- `README.md`: 更新为默认中文，添加版本说明

### 构建信息
- 构建工具：Rsbuild v1.0.5
- React 版本：18.3.1
- TypeScript 版本：5.5.2
- 扩展清单版本：Manifest V3

## 📋 兼容性

- **浏览器**：Chrome 88+，Edge 88+
- **Manifest V3**：完全支持
- **多语言**：支持中文、英文、日文

## ⚠️ 注意事项

- 此版本修改了原有的核心行为，请根据需要选择使用
- 保留了所有原有的键盘快捷键和搜索功能
- 如需恢复基于域名的过滤，请使用原版本

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**下载地址**：[Releases 页面](https://github.com/CatechumenLee/site-history-express/releases)

**原项目**：[site-history-express/site-history-express](https://github.com/site-history-express/site-history-express)