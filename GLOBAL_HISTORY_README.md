# 全局历史记录版本

这是 Site History Express 的一个修改版本，主要变更如下：

## 🚀 主要功能修改

### 全局历史记录显示
- **原功能**：在特定网站页面点击扩展时，只显示该网站的浏览历史
- **修改后**：无论在哪个页面点击扩展，都显示所有网站的浏览历史记录

## 📝 具体修改内容

1. **后台脚本修改** (`src/background/index.ts`)
   - 创建新的 `createGlobalHistoryItems()` 函数
   - 修改 `getFullItems()` 和 `prepareFlashItems()` 函数
   - 移除基于当前域名的过滤逻辑

2. **弹窗界面简化** (`src/popup/App.tsx`)
   - 移除域名匹配模式相关逻辑
   - 简化历史记录显示逻辑

3. **过滤栏更新** (`src/popup/component/FilterBar/index.tsx`)
   - 移除匹配模式切换按钮
   - 简化占位符文本

4. **项目文档**
   - 添加 `CLAUDE.md` 文件，提供开发指导

## 🛠️ 安装和使用

1. **构建项目**：
   ```bash
   npm install
   npm run build
   ```

2. **安装扩展**：
   - 在 Chrome 浏览器中打开 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的 `dist` 目录

3. **使用方法**：
   - 点击扩展图标即可查看全局浏览历史记录
   - 使用搜索框快速查找特定页面
   - 支持键盘快捷键导航

## 📄 许可证

原项目许可证适用于此修改版本。

---

**注意**：这是对原项目 [site-history-express/site-history-express](https://github.com/site-history-express/site-history-express) 的修改版本。