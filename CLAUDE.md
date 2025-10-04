# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Site History Express 是一个浏览器扩展程序，用于显示当前网站或所有网站的浏览历史记录。该扩展使用 React + TypeScript + Tailwind CSS 开发，并通过 Rsbuild 构建。

## 开发命令

```bash
# 启动开发服务器
yarn dev

# 构建扩展
yarn build
```

## 项目架构

### 构建配置
- 使用 Rsbuild 作为构建工具，配置文件为 `rsbuild.config.ts`
- 支持两个环境：
  - `web`：构建弹窗界面 (popup)
  - `webworker`：构建后台脚本 (background)

### 核心模块

#### 后台脚本 (`src/background/index.ts`)
- 监听浏览器历史记录变化 (`chrome.history.onVisited`, `chrome.history.onVisitRemoved`)
- 维护内存中的历史记录缓存，使用防抖优化性能
- 提供两种数据获取方式：
  - `getFlashItems()`：快速获取少量项目用于弹窗显示
  - `getFullItems()`：获取完整的历史记录
- 处理标签页切换和更新事件

#### 弹窗界面 (`src/popup/`)
- `App.tsx`：主组件，负责状态管理和数据获取
- `HistoryItemList`：历史记录列表组件，支持虚拟滚动
- `FilterBar`：过滤和搜索组件

#### 公共模块 (`src/common/`)
- `history.ts`：历史记录数据结构和获取逻辑
- `url.ts`：URL 处理和域名解析
- `mode.ts`：匹配模式管理（严格模式/宽松模式）
- `message.ts`：前后台通信接口
- `hash.ts`：哈希计算工具
- `stream.ts`：防抖等流处理工具

### 数据流
1. 后台脚本监听历史记录变化，更新内存缓存
2. 弹窗打开时，先从 `chrome.storage.session` 获取预加载的少量数据快速显示
3. 然后通过消息通信从后台脚本获取完整数据
4. 支持基于当前网站的域名过滤和关键词搜索

### 浏览器扩展配置
- `manifest.json`：扩展配置文件，定义权限和入口点
- 支持多语言：英语、简体中文、日语
- 权限：`tabs`, `history`, `storage`, `favicon`

## 开发注意事项

- 该项目是浏览器扩展，需要了解 Chrome Extension API
- 虚拟滚动使用 `react-virtualized` 库处理大量历史记录
- 前后台通信通过 `chrome.runtime.sendMessage` 进行
- 历史记录数据经过去重处理，使用 URL 和标题的哈希值作为唯一标识
- 匹配模式会保存在 `chrome.storage.sync` 中，支持跨设备同步