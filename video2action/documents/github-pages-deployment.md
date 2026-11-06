# Video2Action 科研汇报 · GitHub Pages

主站地址：<https://frank95zz.github.io/video2action/>。

本网页为纯静态 React / Vite 站点，使用 GitHub Pages 托管。发布只涉及个人主页仓库的 `video2action/` 子目录，个人主页保持原样。页面内容与视频由静态文件直接提供，无需 Sites API 或后端服务。

## 本地复现

```bash
npm ci
npm run build
npm run check
npm run preview -- --port 4173
```

浏览器打开预览服务输出的 URL。不要直接双击 `dist/index.html`，因为内容 JSON 需要由 HTTP 服务读取。

## 更新网页

先生成并检查 `dist/`，然后将完整构建产物复制到 GitHub Pages 仓库的 `video2action/` 目录，再提交推送。无需为此站新增 Actions；沿用个人站点的 Pages 分支发布方式。`vite.config.js` 中 `base: './'`，视频、字体、数据和讲稿使用相对路径，适用于 `/video2action/` 子路径。

所有 34 段实验视频在 `public/media/`，内容与来源在 `content/evidence.json`、`content/media_manifest.json`，源码在 `src/`。保留媒体，不将 Teacher 画面替代为 Student 输出。

## v5 阅读方式

- 第一节为当前 GVHMR 双前端完整方法图，支持放大与 SVG 下载。
- 第二节仍为六段 Overfit 独立证据。
- R37 图表以绿色标记当前模型；粗体只表示同协议内最优数值。
- 第 15 节说明推理耗时与总成本，第 16 节说明免重定向的实际范围。
- R38 仍在训练；阶段候选不能覆盖 R37 已完成的主结果。
