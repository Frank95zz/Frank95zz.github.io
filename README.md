# 冯焱琦 · Yanqi Feng

上海交通大学自动化与感知学院博士生，IWIN-FINS 实验室。

**个人主页：** https://frank95zz.github.io/ · [English](https://frank95zz.github.io/?lang=en)

本仓库包含中英双语学术主页，以及最新中英文 LaTeX 简历和 PDF。网站为无依赖的静态页面，可直接由 GitHub Pages 发布。

## 更新内容

- 在 `assets/site-content.js` 中同时更新 `zh` 和 `en` 两组内容。
- 执行 `node tools/prerender.cjs`，同步中文静态页面，保证关闭 JavaScript 时也能阅读。
- 修改 `cv/cv-zh.tex`、`cv/cv-en.tex` 后用 XeLaTeX 编译两次，检查两种语言的分页。
- 将新 PDF 同步到 `files/CV_Chinese.pdf` 和 `files/Curriculum_Vitae_YanqiFeng.pdf`，继续兼容旧链接。
- 推送到 `master` 后，GitHub Pages 自动发布根目录；`.nojekyll` 跳过 Jekyll。

## 本地预览

```powershell
python -m http.server 8000
```

访问 http://localhost:8000/ 。无需安装 Node 包或 Ruby。

- [网站维护与素材来源](WEBSITE.md)
- [简历编译说明](cv/README.md)
- [中文简历 PDF](cv/cv-zh.pdf) / [English CV PDF](cv/cv-en.pdf)
- [论文 BibTeX](publications.bib)

原 Academic Pages 版本可从 Git 历史的 `06a7958` 提交恢复。原模板许可保留在 `LICENSE`；素材的来源与许可见 `WEBSITE.md`。
