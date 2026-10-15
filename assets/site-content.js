/* Content is kept separate from presentation. Edit both languages together. */
window.SITE_CONTENT = {
  zh: {
    title: '冯焱琦 Yanqi Feng · 上海交通大学',
    description: '冯焱琦，上海交通大学自动化与感知学院博士生，IWIN-FINS 实验室。研究兴趣包括水下机器人感知、导航与控制。',
    ui: { skip: '跳至主要内容', navPublications: '论文', navResearch: '研究', navProjects: '开源', navExperience: '经历', navContact: '联系', navigation: '主导航', language: '选择语言', menuOpen: '打开导航菜单', menuClose: '关闭导航菜单', home: '冯焱琦，主页', footer: '学术与探索，持续更新。', backTop: '返回顶部 ↑', portraitAlt: '冯焱琦的个人照片', location: '上海，中国', cvLabel: '简历下载', email: '邮箱', code: '代码', preprint: '预印本', paper: '论文', summary: '研究概要', bibtex: '复制 BibTeX', copied: 'BibTeX 已复制', manualCopy: '请选中并复制下方 BibTeX。', close: '关闭', done: '完成', showMore: '更多荣誉', updated: '更新于 2026 年 10 月', publicationCount: '篇论文', filterLabel: '按研究主题筛选论文', empty: '该主题暂无论文。', newsTitle: '近期动态', newsEyebrow: 'RECENT UPDATES', publicationsTitle: '论文与成果', publicationsEyebrow: 'PUBLICATIONS', publicationsIntro: '从搜索策略到水下视觉跟踪，围绕机器人在复杂环境中的自主行为开展研究。', scholarAll: '全部学术成果', researchTitle: '研究经历', researchEyebrow: 'RESEARCH EXPERIENCE', researchIntro: '将算法与真实系统连接，关注感知的不确定性、规划的效率与工程实现。', projectsTitle: '开放项目', projectsEyebrow: 'OPEN SOURCE', experienceTitle: '教育与经历', experienceEyebrow: 'BACKGROUND', honorsTitle: '荣誉与奖励', skillsTitle: '技能与工具', contactTitle: '保持联系', contactIntro: '欢迎就水下机器人、感知与控制、规划与优化等方向交流。', contactLink: '写封邮件', advisor: '导师', contribution: '我的工作', viewProject: '查看项目', video: '制作教程', education: '教育背景', competitions: '竞赛与实践', researchInterest: '研究兴趣', filters: ['全部', '水下机器人', '搜索与规划'] },
    hero: { eyebrow: '上海交通大学 · IWIN-FINS 实验室', name: '冯焱琦', otherName: 'Yanqi Feng', role: '自动化与感知学院 · 博士研究生', description: '我关注<strong>水下机器人的感知、导航与控制</strong>，探索从状态估计、运动规划到真实机器人系统的连接。现于上海交通大学 <a href="https://iwin-fins.com/" target="_blank" rel="noopener noreferrer">IWIN-FINS 实验室</a>开展研究，导师为 <a href="https://scholar.google.com/citations?user=uMFWYBoAAAAJ" target="_blank" rel="noopener noreferrer">何建平教授</a>。', note: '此前就读于西安交通大学自动化（越杰班），于 2026 年 6 月毕业。', interests: ['水下机器人', '状态估计', '规划与控制'] },
    news: [
      ['2026.09', '参与的水下视觉目标跟踪研究已发布 <a href="https://arxiv.org/abs/2609.20731" target="_blank" rel="noopener noreferrer">arXiv 预印本 ↗</a>。'],
      ['2026.09', '加入上海交通大学自动化与感知学院，开始博士阶段的研究。'],
      ['2026.04', '作为队长带队首次参加 MATE 中国大陆区域赛，获 <strong>PIONEER 组别冠军</strong>。']
    ],
    papers: [
      { id: 'tracking', category: 'underwater', year: '2026', venue: 'arXiv · 预印本', title: 'Underwater Visual Target Tracking with Target-Specific Depth Estimation and Adaptive Model-Fusion Predictive Control', authors: 'Yuheng Zhou, Haiyang Cheng, <strong>Yanqi Feng</strong>, Pangkit Fong, Mei Xuan Lee, Marcus Gee, Chongrong Fang, Jianping He', summary: '结合双目视觉、目标特定深度提取与卡尔曼滤波，估计目标三维相对状态；通过偏航与平移解耦，使用自适应模型融合预测控制，在执行器、跟踪距离与视场约束下跟踪水下目标。模型融合根据历史预测误差，动态调整匀速与零速目标运动模型的权重。', tags: ['视觉目标跟踪', '深度估计', '预测控制'], url: 'https://arxiv.org/abs/2609.20731', label: 'arXiv', image: 'assets/media/tracking-overview.webp', imageAlt: '论文图 1：水下目标跟踪任务与坐标系示意图' },
      { id: 'search', category: 'planning', year: '2025', venue: 'ACTCE 2025 · IEEE', title: 'A Two-Stage Search Algorithm for Static Target in A 2D Unknown Complex Environment', authors: '<strong>Yanqi Feng</strong>, Enming Chu, Junru Chen, Long Chen', summary: '面向二维未知复杂环境中的静态目标搜索，提出两阶段搜索算法。该研究源于深海失事潜水器搜索建模工作，结合位置预测与 A* 路径搜索策略，探索复杂环境下的目标搜索问题。', tags: ['目标搜索', '路径规划', 'A*'], url: 'https://doi.org/10.1109/ACTCE66599.2025.00019', label: 'DOI', image: '', imageAlt: '' }
    ],
    research: [
      { number: '01', period: '2025.08', title: '水下机器人多传感器状态估计', subtitle: '九轴 IMU × 水压计 × EKF', description: '基于 IWIN-FINS 水下机器人平台，构建融合九轴 IMU 与水压计数据的扩展卡尔曼滤波模型，完成嵌入式代码实现。实验中较仅依赖 IMU 的 Mahony 算法表现出更好的稳定性。', advisor: '何建平教授 · 上海交通大学', role: '独立开展', tags: ['传感器融合', '嵌入式实现'] },
      { number: '02', period: '2024.02 — 2025.01', title: '有限缓冲区装配流水车间调度', subtitle: 'Q-learning × DPSO × VND + IG', description: '研究有限缓冲区、两阶段装配、无等待置换流水车间的死锁与调度问题。将 Q 学习引入离散粒子群优化，用于动态选择进化方式，并设计 VND + IG 两阶段局部搜索算法。', advisor: '冯彦翔副教授 · 西安交通大学', role: '独立开展', tags: ['组合优化', '调度算法'] },
      { number: '03', period: '2024.04 — 2025.04', title: '基于深度学习的油田智能终端', subtitle: '国家级大学生创新训练项目', description: '参与将示功图分类算法部署到 RK3568 嵌入式设备的智能终端项目，支持油井工况识别与自动间抽。主要负责异常示功图数据集的构建。', advisor: '张翠翠老师 · 西安交通大学', role: '团队成员', tags: ['数据集构建', '工业智能'] }
    ],
    project: { kicker: 'FINSROV · OPEN HARDWARE & SOFTWARE', title: '让水下机器人，<br>从构想到实践。', description: 'FinsROV 是基于水下相机的多机器人开放平台，涵盖机械设计、上下位机代码及配套制作视频，帮助研究者和爱好者搭建自己的水下机器人。', contribution: '参与下位机控制代码、上下位机通信代码的调试，以及视频教程制作。', imageAlt: 'FinsROV 水下机器人平台的三维设计模型', tags: ['开放机械设计', '控制与通信', '视频教程'] },
    education: [
      { period: '2026.09 — 至今', title: '上海交通大学', subtitle: '自动化与感知学院 · 博士研究生', detail: 'IWIN-FINS 实验室，研究方向为水下机器人的控制与规划。导师：何建平教授。', badge: '博士' },
      { period: '2022.09 — 2026.06', title: '西安交通大学', subtitle: '自动化（越杰班）· 钱学森书院', detail: '成绩 98.68；自动化大类排名 1/195，越杰班排名 1/30。学业导师：韩德强教授。', badge: '本科' }
    ],
    competitions: [
      { date: '2026.04', title: 'MATE 国际水下机器人大赛', label: '中国大陆区域赛 · PIONEER 冠军', role: '队长', text: '搭建搭载四自由度机械臂的水下机器人平台；负责基于 YOLO 的水下物种识别、技术体系梳理与文档，并统筹团队备赛和模块协作。' },
      { date: '2024.11', title: 'RoboCup 机器人世界杯中国赛', label: '自动分拣机器人 · 智能投送二等奖', role: '电控', text: '基于 STM32F103ZET6 开发智能车的运动控制与通信逻辑，完成不同颜色邮件分拣、投递的规划与实际调试。' },
      { date: '2024.02', title: '美国大学生数学建模竞赛 MCM', label: 'Finalist · 前 2%', role: '队长 / 论文', text: '建立深海失事潜水器位置预测模型与两阶段搜索策略；负责论文写作、LaTeX 排版、绘图、建模辅助及团队协调。' }
    ],
    honors: [
      ['2023—2025', '国家奖学金', '2023—2024、2024—2025 学年'],
      ['2022—2026', '越杰奖学金', '基础奖学金与国际交流奖学金'],
      ['2022—2024', '西安交通大学优秀学生', '2022—2023、2023—2024 学年'],
      ['2024.09', '中国国际大学生创新大赛', '陕西赛区省级银奖'],
      ['2023.12', '全国大学生数学竞赛', '非数学 A 类 · 陕西省二等奖']
    ],
    skills: [ ['编程', 'C / MATLAB / Python'], ['工程工具', 'Keil / Git / Docker / LaTeX'], ['语言', 'CET-4：613 / CET-6：547'] ]
  },
  en: {
    title: 'Yanqi Feng · Shanghai Jiao Tong University',
    description: 'Yanqi Feng is a PhD student at Shanghai Jiao Tong University and the IWIN-FINS Lab, working on perception, navigation, and control for underwater robots.',
    ui: { skip: 'Skip to main content', navPublications: 'Publications', navResearch: 'Research', navProjects: 'Open source', navExperience: 'Background', navContact: 'Contact', navigation: 'Main navigation', language: 'Choose language', menuOpen: 'Open navigation menu', menuClose: 'Close navigation menu', home: 'Yanqi Feng, home', footer: 'Research, exploration, and work in progress.', backTop: 'Back to top ↑', portraitAlt: 'Portrait of Yanqi Feng', location: 'Shanghai, China', cvLabel: 'Curriculum vitae', email: 'Email', code: 'Code', preprint: 'Preprint', paper: 'Paper', summary: 'Research summary', bibtex: 'Copy BibTeX', copied: 'BibTeX copied', manualCopy: 'Select and copy the BibTeX citation below.', close: 'Close', done: 'Done', showMore: 'More awards', updated: 'Updated October 2026', publicationCount: 'publications', filterLabel: 'Filter publications by research topic', empty: 'No publications in this topic yet.', newsTitle: 'Latest updates', newsEyebrow: 'RECENT UPDATES', publicationsTitle: 'Publications', publicationsEyebrow: 'SELECTED WORK', publicationsIntro: 'From search strategies to underwater visual tracking: autonomous behavior in complex environments.', scholarAll: 'Google Scholar', researchTitle: 'Research experience', researchEyebrow: 'RESEARCH EXPERIENCE', researchIntro: 'Connecting algorithms to real systems through state estimation, efficient planning, and embedded implementation.', projectsTitle: 'Built to be shared', projectsEyebrow: 'OPEN SOURCE', experienceTitle: 'Education & experience', experienceEyebrow: 'BACKGROUND', honorsTitle: 'Honors & awards', skillsTitle: 'Skills & tools', contactTitle: 'Let’s stay in touch.', contactIntro: 'I welcome conversations about underwater robotics, perception and control, and planning and optimization.', contactLink: 'Send an email', advisor: 'Advisor', contribution: 'My contribution', viewProject: 'Explore the project', video: 'Video tutorials', education: 'Education', competitions: 'Competitions & practice', researchInterest: 'Research interests', filters: ['All work', 'Underwater robotics', 'Search & planning'] },
    hero: { eyebrow: 'SHANGHAI JIAO TONG UNIVERSITY · IWIN-FINS LAB', name: 'Yanqi Feng', otherName: '冯焱琦', role: 'PhD Student · School of Automation and Intelligent Sensing', description: 'I study <strong>perception, navigation, and control for underwater robots</strong>, connecting state estimation and motion planning with real robotic systems. I am a PhD student at the <a href="https://iwin-fins.com/" target="_blank" rel="noopener noreferrer">IWIN-FINS Lab</a>, Shanghai Jiao Tong University, advised by <a href="https://scholar.google.com/citations?user=uMFWYBoAAAAJ" target="_blank" rel="noopener noreferrer">Prof. Jianping He</a>.', note: 'Previously, I studied Automation in the Academic Elite Program at Xi’an Jiaotong University, graduating in June 2026.', interests: ['Underwater robotics', 'State estimation', 'Planning & control'] },
    news: [
      ['2026.09', 'Our work on underwater visual target tracking is available as an <a href="https://arxiv.org/abs/2609.20731" target="_blank" rel="noopener noreferrer">arXiv preprint ↗</a>.'],
      ['2026.09', 'Started my PhD at the School of Automation and Intelligent Sensing, Shanghai Jiao Tong University.'],
      ['2026.04', 'Led our team to the <strong>PIONEER championship</strong> at the MATE China Mainland Regional Competition on our first entry.']
    ],
    papers: [
      { id: 'tracking', category: 'underwater', year: '2026', venue: 'arXiv · Preprint', title: 'Underwater Visual Target Tracking with Target-Specific Depth Estimation and Adaptive Model-Fusion Predictive Control', authors: 'Yuheng Zhou, Haiyang Cheng, <strong>Yanqi Feng</strong>, Pangkit Fong, Mei Xuan Lee, Marcus Gee, Chongrong Fang, Jianping He', summary: 'Stereo vision, target-specific depth extraction, and Kalman filtering estimate the target’s relative 3D state. An adaptive model-fusion predictive controller decouples yaw and translation while accounting for actuator, tracking-distance, and field-of-view constraints. Historical prediction errors determine the weights of constant-velocity and zero-velocity target motion models.', tags: ['Visual target tracking', 'Depth estimation', 'Predictive control'], url: 'https://arxiv.org/abs/2609.20731', label: 'arXiv', image: 'assets/media/tracking-overview.webp', imageAlt: 'Figure 1 from the paper: schematic of the underwater target tracking task and coordinate frames' },
      { id: 'search', category: 'planning', year: '2025', venue: 'ACTCE 2025 · IEEE', title: 'A Two-Stage Search Algorithm for Static Target in A 2D Unknown Complex Environment', authors: '<strong>Yanqi Feng</strong>, Enming Chu, Junru Chen, Long Chen', summary: 'A two-stage search algorithm for static targets in unknown, complex two-dimensional environments. Developed from modeling work on locating a wrecked deep-sea submersible, the study combines position prediction with an A* search strategy.', tags: ['Target search', 'Path planning', 'A*'], url: 'https://doi.org/10.1109/ACTCE66599.2025.00019', label: 'DOI', image: '', imageAlt: '' }
    ],
    research: [
      { number: '01', period: '2025.08', title: 'Multi-sensor state estimation for underwater robots', subtitle: '9-AXIS IMU × PRESSURE SENSOR × EKF', description: 'Developed an extended Kalman filter that fuses 9-axis IMU and hydrostatic pressure measurements on the IWIN-FINS underwater robot platform. Implemented the embedded code and observed improved stability over an IMU-only Mahony filter in experiments.', advisor: 'Prof. Jianping He · SJTU', role: 'Independent research', tags: ['Sensor fusion', 'Embedded systems'] },
      { number: '02', period: '2024.02 — 2025.01', title: 'Scheduling with limited buffers and assembly constraints', subtitle: 'Q-LEARNING × DPSO × VND + IG', description: 'Studied deadlock and scheduling in a two-stage assembly no-wait permutation flowshop with limited buffers. Integrated Q-learning into discrete particle swarm optimization for adaptive evolution selection, with VND + IG two-stage local search.', advisor: 'Assoc. Prof. Yanxiang Feng · XJTU', role: 'Independent research', tags: ['Combinatorial optimization', 'Scheduling'] },
      { number: '03', period: '2024.04 — 2025.04', title: 'An AI-powered terminal for oilfield operations', subtitle: 'NATIONAL UNDERGRADUATE INNOVATION PROJECT', description: 'Contributed to a smart-terminal project that deploys dynamometer-card classification on RK3568 embedded hardware for oil-well condition identification and automated intermittent pumping. Responsible for building the abnormal dynamometer-card dataset.', advisor: 'Cuicui Zhang · XJTU', role: 'Team member', tags: ['Dataset development', 'Industrial AI'] }
    ],
    project: { kicker: 'FINSROV · OPEN HARDWARE & SOFTWARE', title: 'Underwater robotics.<br>Open to exploration.', description: 'FinsROV is an underwater camera-based multi-robot platform with mechanical designs, onboard and host-side code, and step-by-step video tutorials for building an underwater robot.', contribution: 'Debugged onboard control and host–robot communication code, and produced video tutorials.', imageAlt: 'A three-dimensional design model of the FinsROV underwater robot platform', tags: ['Mechanical design', 'Control & communication', 'Video tutorials'] },
    education: [
      { period: '2026.09 — Present', title: 'Shanghai Jiao Tong University', subtitle: 'PhD · School of Automation and Intelligent Sensing', detail: 'IWIN-FINS Lab. Research in control and planning for underwater robots. Advisor: Prof. Jianping He.', badge: 'PhD' },
      { period: '2022.09 — 2026.06', title: 'Xi’an Jiaotong University', subtitle: 'Automation · Academic Elite Program', detail: 'Academic score: 98.68. Ranked 1/195 in Automation and 1/30 in the Academic Elite Program. Academic advisor: Prof. Deqiang Han.', badge: 'Undergraduate' }
    ],
    competitions: [
      { date: '2026.04', title: 'MATE ROV Competition', label: 'China Mainland Regional · PIONEER Champion', role: 'Team leader', text: 'Built an underwater robotic platform with a four-degree-of-freedom manipulator. Developed YOLO-based underwater species recognition, organized technical documentation, and coordinated preparation and system integration.' },
      { date: '2024.11', title: 'RoboCup China Open', label: 'Intelligent Delivery · Second Prize', role: 'Embedded control', text: 'Developed motion control and communication logic for an STM32F103ZET6-based vehicle, including planning and debugging for sorting and delivering differently colored mail.' },
      { date: '2024.02', title: 'Mathematical Contest in Modeling', label: 'MCM Finalist · Top 2%', role: 'Team leader / Writing', text: 'Modeled a wrecked deep-sea submersible’s location and a two-stage search strategy. Led paper writing, LaTeX typesetting, figure preparation, modeling support, and team coordination.' }
    ],
    honors: [
      ['2023—2025', 'National Scholarship', '2023–2024 and 2024–2025 academic years'],
      ['2022—2026', 'Academic Elite Program Scholarship', 'Basic and international exchange scholarships'],
      ['2022—2024', 'Outstanding Student, XJTU', '2022–2023 and 2023–2024 academic years'],
      ['2024.09', 'China International College Students’ Innovation Competition', 'Silver Prize · Shaanxi Division'],
      ['2023.12', 'National College Mathematics Competition', 'Second Prize · Non-Math Category A, Shaanxi']
    ],
    skills: [ ['Programming', 'C / MATLAB / Python'], ['Tools', 'Keil / Git / Docker / LaTeX'], ['English', 'CET-4: 613 / CET-6: 547'] ]
  }
};

window.SITE_BIBTEX = {
  tracking: `@misc{zhou2026underwater,
  title = {Underwater Visual Target Tracking with Target-Specific Depth Estimation and Adaptive Model-Fusion Predictive Control},
  author = {Zhou, Yuheng and Cheng, Haiyang and Feng, Yanqi and Fong, Pangkit and Lee, Mei Xuan and Gee, Marcus and Fang, Chongrong and He, Jianping},
  year = {2026},
  eprint = {2609.20731},
  archivePrefix = {arXiv},
  primaryClass = {cs.RO},
  url = {https://arxiv.org/abs/2609.20731}
}`,
  search: `@inproceedings{feng2025twostage,
  title = {A Two-Stage Search Algorithm for Static Target in A 2D Unknown Complex Environment},
  author = {Feng, Yanqi and Chu, Enming and Chen, Junru and Chen, Long},
  booktitle = {2025 2nd International Seminar on Artificial Intelligence, Computer Technology and Control Engineering (ACTCE)},
  year = {2025},
  pages = {70--75},
  publisher = {IEEE},
  doi = {10.1109/ACTCE66599.2025.00019}
}`
};
