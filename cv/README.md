# 冯焱琦 / Yanqi Feng - 学术简历

更新时间：2026 年 10 月 15 日。

- `cv-zh.tex` / `cv-zh.pdf`：中文简历。
- `cv-en.tex` / `cv-en.pdf`：英文简历。
- `academic-cv.sty`：两份简历共享的排版样式。

## 编译

需要 TeX Live 或 MiKTeX 的 XeLaTeX 引擎。三个源文件应保存在同一个目录。

```powershell
xelatex -interaction=nonstopmode -halt-on-error cv-zh.tex
xelatex -interaction=nonstopmode -halt-on-error cv-zh.tex
xelatex -interaction=nonstopmode -halt-on-error cv-en.tex
xelatex -interaction=nonstopmode -halt-on-error cv-en.tex
```

也可以将三个源文件上传到 Overleaf，将编译器设置为 XeLaTeX，再选择需要的主文档。字体优先使用 Microsoft YaHei；其他环境自动回退到 TeX Live 中的 FandolHei。英文字体使用 TeX Gyre Heros。

## 内容口径

以用户提供的中文简历为主要依据，旧英文简历用于英文表达和事实交叉核对；没有将旧英文简历的 `Present` 任期自动延长到 2026 年。

1. 教育经历按当前日期更新：2026 年 6 月结束西安交通大学本科阶段学习，2026 年 9 月开始上海交通大学博士阶段学习。
2. 邮箱统一为 `fengyanqi@sjtu.edu.cn`。该版本用于公开学术展示，不包含出生年月和个人手机号。
3. 保留成绩 98.68 及两个排名，不将其换算为 GPA，也不补充未明确给出的满分、成绩类型或学位英文名称。
4. 新增 arXiv:2609.20731，按 arXiv 官方页面保留全部 8 位作者及其顺序，明确标注为预印本，未称为已被会议或期刊录用。
5. ACTCE 2025 论文按 Crossref 官方元数据补齐 4 位作者（Yanqi Feng、Enming Chu、Junru Chen、Long Chen）、页码 70-75 与 DOI `10.1109/ACTCE66599.2025.00019`。
6. 保留 2026 MATE 中国大陆区域赛 PIONEER 组别冠军、两次国家奖学金和 FinsROV 的具体贡献。项目链接更新为用户指定的 IWIN-FINS 仓库。
7. 未沿用原稿中变化较快的 Stars 与视频播放量，也未沿用难以统一核验的“全球最系统之一”等评价和国家奖学金获奖比例。
8. 旧英文稿中的社团副主席经历缺少结束日期、且中文主版本没有列出，本次没有加入；原稿中所列编程与软件技能以中文版本为准。

## 维护

两种语言分别维护内容，共享样式。更新成果时同时修改两份 `.tex`，并更新各文件中的日期。`cv-zh.tex` 和 `cv-en.tex` 均用显式分页保持两页结构；增加较多内容时，应重新检查页数和分页。

外部链接：

- [个人主页](https://frank95zz.github.io/)
- [Google Scholar](https://scholar.google.com/citations?user=dgjReZ4AAAAJ)
- [FinsROV](https://github.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform)
- [arXiv 预印本](https://arxiv.org/abs/2609.20731)
- [ACTCE 2025 论文](https://doi.org/10.1109/ACTCE66599.2025.00019)

此目录仅包含最终 PDF 和可编辑源文件；编译辅助文件与检查图片不需要纳入版本管理。
