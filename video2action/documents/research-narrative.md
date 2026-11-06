# Video2Action｜科研汇报材料与证据

证据快照：2026年11月5日。新版网页按完整Pipeline、逐模块reason、训练、消融与指标展开；20条原精选及3条新增GV融合对照视频在页面内直接播放。最新正文以网页14节为主，以下保留既有实验材料。逐模块可检验假设与24项消融见module_reasoning.json。

## 研究问题

人和机器人看起来不同，但一个动作仍包含共同的节奏、姿态与方向。我们希望把这些信息交给同一个视觉模型，再通过可执行的运动命令连接到机器人身体。困难不仅在于看懂视频：机器人一旦产生方向或速度偏差，原本在teacher状态下成立的命令，也可能不再适合当前身体状态。

因此，项目同时研究三个问题：人和机器人能否共享命令；视觉动作能否在物理中持续执行；视频意图如何与机器人的实际状态匹配。

## 方法：从RGB到实际运动

### 01 · 读取运动上下文

双时间窗口同时保留局部动作和较长节奏。VideoMAE提供视觉特征，末4层LoRA与后续预测头学习从两种外观到运动命令的映射。每个锚点读取2×49×768特征。

### 02 · 汇聚姿态与时间变化

绝对特征与相对静态首帧clip的特征差共同输入。空间query关注局部身体信息，8锚点时序模块整合节奏与相位。这里的特征差是相对第一帧重复16次构成的静态clip的特征差，不是相邻帧时间导数。

### 03 · 预测共享命令

真人与机器人RGB经过同一个forward，预测未来5个50Hz命令，输出5×2×32个连续pre-FSQ数值，再执行一次固定量化。训练时，同步的人类视频与teacher机器人渲染指向同一命令标签。推理时使用视频预测，不读取teacher动作序列。

### 04 · 让方向匹配实际状态

已有研究分支将视频估计的相对yaw与机器人实际yaw结合，对冻结的RGB命令作状态相关变换。在12片几何可用DEV上，新Joint的heading从38.06°降至5.23°。该分支使用离线GVHMR，不是所有RGB模型的默认输入；方向改善之后，移动路程仍约为参考的一半。

### 05 · 在物理中执行

64维命令与930维本体状态送入冻结SONIC decoder，产生29维关节动作，经PD控制和MuJoCo接触动力学得到实际运动。student列显示这一物理执行结果。teacher列仅作为评分参考。

**训练与部署说明。** 主线训练使用离线动捕适配和teacher命令；主线部署输入为RGB与机器人本体状态。部分数据窗口含0.5秒前瞻，参考姿态初始化也影响部署条件。头部因果mask不等于整个系统零延迟因果。当前主结果来自监督训练，不应标为端到端视觉PPO。

## 逐片实验与来源

以下视频全部可追溯到汇报目录中的现有文件；不改轨迹，不重跑物理。

### 01 · 机器人RGB → 物理执行

**Robot / Native / Flow / TRAIN · 6.00s**

原生Flow控制器链路：机器人RGB、源动作重建与视觉驱动物理执行；三栏展示坐标有初始对齐。

本精选清单未绑定可信的逐片数值；不从视频外观推测定量分数。

视频：[01_机器人输入_原生Flow控制器_训练动作009868.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/01_机器人输入_原生Flow控制器_训练动作009868.mp4)

证据：[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)；[Demo来源与视频信息.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/Demo来源与视频信息.json)

### 02 · 原生链路 · 验证动作

**Robot / Native / DEV · 6.00s**

动作012203未参与该视觉模型梯度训练，展示机器人输入的开发验证案例。

本精选清单未绑定可信的逐片数值；不从视频外观推测定量分数。

视频：[03_机器人输入_原生Flow控制器_验证动作012203.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/03_机器人输入_原生Flow控制器_验证动作012203.mp4)

证据：[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)；[Demo来源与视频信息.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/Demo来源与视频信息.json)

### 03 · 同一Joint模型 · 行走

**Human / Joint / TRAIN / 6段Overfit · 11.28s**

持续行走展示姿态和步态拟合，同时仍可观察全局位置偏差。

q 0.03745rad · XY 0.27725m · heading 8.95°。

视频：[05_双域联合训练_真人行走_六段Overfit.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/05_双域联合训练_真人行走_六段Overfit.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 04 · 同一Joint模型 · 慢跑

**Human / Joint / TRAIN / 6段Overfit · 10.08s**

关注足部交替、躯干节奏与上肢协调。

q 0.03437rad · XY 0.01786m · heading 2.21°。

视频：[06_双域联合训练_真人慢跑_六段Overfit.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/06_双域联合训练_真人慢跑_六段Overfit.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 05 · 同一Joint模型 · 伸展

**Human / Joint / TRAIN / 6段Overfit · 4.96s**

关注手臂幅度及全身姿态传递。

q 0.03071rad · XY 0.01077m · heading 2.14°。

视频：[07_双域联合训练_真人伸展_六段Overfit.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/07_双域联合训练_真人伸展_六段Overfit.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 06 · 同一Joint模型 · 抛接

**Human / Joint / TRAIN / 6段Overfit · 7.56s**

上肢和躯干协调；与机器人抛接视频共享同一模型参数。

q 0.02980rad · XY 0.00498m · heading 3.45°。

视频：[08_双域联合训练_真人抛接_六段Overfit.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/08_双域联合训练_真人抛接_六段Overfit.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 07 · 同一Joint模型 · 侧移

**Human / Joint / TRAIN / 6段Overfit · 7.60s**

关注身体朝向和横向步态的配合。

q 0.02132rad · XY 0.07984m · heading 8.00°。

视频：[09_双域联合训练_真人侧移_六段Overfit.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/09_双域联合训练_真人侧移_六段Overfit.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 08 · 同一Joint模型 · 打电话

**Human / Joint / TRAIN / 6段Overfit · 8.56s**

小幅局部上肢动作，与移动动作共用一个模型。

q 0.02423rad · XY 0.02876m · heading 1.51°。

视频：[10_双域联合训练_真人打电话_六段Overfit.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/10_双域联合训练_真人打电话_六段Overfit.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 09 · 同一Joint模型 · 机器人抛接

**Robot / Joint / TRAIN / 6段Overfit · 7.56s**

与真人抛接共享前端参数、命令空间和SONIC控制器；输入外观改变，命令目标对应同一动作。

q 0.02992rad · XY 0.00498m · heading 5.73°。

视频：[11_同一联合模型_机器人视频输入_抛接.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/11_同一联合模型_机器人视频输入_抛接.mp4)

证据：[六段联合拟合_原始审计.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/六段联合拟合_原始审计.json)；[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)

### 10 · 失败案例 · 动了，但没有走够

**Human / DEV/VAL / 失败对照 / Root · 8.52s**

267段模型在未训练人物上的行走：局部动作可见，全局推进不足。完整保留这一失败，解释姿态误差与世界轨迹误差的差别。

本精选清单未绑定可信的逐片数值；不从视频外观推测定量分数。

视频：[15_问题示例_未训练人物行走_平移不足.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/15_问题示例_未训练人物行走_平移不足.mp4)

证据：[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)；[Demo来源与视频信息.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/Demo来源与视频信息.json)

### 11 · Human续训 · 连续45秒

**Human / 45秒 / 无重置 / 无连续GT · 45.00s**

一次初始化，连续执行45秒。该human-only续训模型来自Joint父模型，用于与联合模型作行为对照。

没有全程连续GT；用于观察动作切换、行为与稳定性，不计入定量跟踪表。

视频：[19_真人续训模型_连续45秒_无重置.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/19_真人续训模型_连续45秒_无重置.mp4)

证据：[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)；[Demo来源与视频信息.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/Demo来源与视频信息.json)

### 12 · Joint模型 · 连续45秒

**Joint / 45秒 / 无重置 / 无连续GT · 45.00s**

同样一次初始化连续执行，与Human续训长片对照动作衔接、移动与稳定性。

没有全程连续GT；用于观察动作切换、行为与稳定性，不计入定量跟踪表。

视频：[20_联合模型_连续45秒_无重置.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/20_联合模型_连续45秒_无重置.mp4)

证据：[观看顺序与说明.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/05_Demo/观看顺序与说明.md)；[Demo来源与视频信息.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/07_数据与来源/Demo来源与视频信息.json)

### 13 · 未训练人物 · Joint第二种子

**Human / Joint / DEV / Intent · 5.20s**

S56侧移，5.20秒。局部迁移案例；与同源无intent对照一起看，不能由单片推出整体优势。

q 0.07712rad · XY 0.06529m · heading 10.82°。

视频：[01_未训练人物侧移_Joint第二种子_5秒.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/Demo/01_未训练人物侧移_Joint第二种子_5秒.mp4)

证据：[展示视频来源与逐片指标.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/数据/展示视频来源与逐片指标.json)；[04_Demo观看顺序与证据.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/04_Demo观看顺序与证据.md)

### 14 · 同人同动作 · 无intent对照

**Human / Joint / DEV / Control · 5.20s**

同源、同seed的control。该片q略低，XY与heading较高；同时保留收益与取舍。

q 0.07520rad · XY 0.07623m · heading 14.54°。

视频：[02_同一人物侧移_无intent对照_5秒.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/Demo/02_同一人物侧移_无intent对照_5秒.mp4)

证据：[展示视频来源与逐片指标.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/数据/展示视频来源与逐片指标.json)；[04_Demo观看顺序与证据.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/04_Demo观看顺序与证据.md)

### 15 · 跨视角探针 · PG1

**Human / DEV / PG1 / 跨视角 · 1.84s**

固定模型、同一看手表动作的PG1相机；与PG2配对观察视角敏感性。

q 0.14391rad · XY 0.00720m · heading 4.41°。

视频：[07_跨视角探针_看手表_PG1.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/Demo/07_跨视角探针_看手表_PG1.mp4)

证据：[展示视频来源与逐片指标.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/数据/展示视频来源与逐片指标.json)；[04_Demo观看顺序与证据.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/04_Demo观看顺序与证据.md)

### 16 · 跨视角探针 · PG2

**Human / DEV / PG2 / 跨视角 · 1.84s**

同一模型、同步动作换为PG2视角。关节误差增大，是待解决的视角局限。

q 0.25774rad · XY 0.01857m · heading 8.39°。

视频：[08_同模型同动作_看手表_PG2.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/Demo/08_同模型同动作_看手表_PG2.mp4)

证据：[展示视频来源与逐片指标.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/数据/展示视频来源与逐片指标.json)；[04_Demo观看顺序与证据.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/04_Demo观看顺序与证据.md)

### 17 · 行走对照 · 加入朝向反馈

**Human / Joint / DEV / 朝向反馈 / 失败对照 · 7.50s**

真人 / 原Joint / 绿色朝向修正Joint。S57单片heading 101.64°→7.31°，实际路程1.002→1.097m，参考2.811m；方向改善，推进仍不足。

该单片与12片主表的adapter版本分列，不能把单片数值当总体均值。

视频：[05_行走_原Joint与朝向修正_8秒.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/Demo/05_行走_原Joint与朝向修正_8秒.mp4)

证据：[04_Demo观看顺序与证据.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/04_Demo观看顺序与证据.md)；[project_research_and_worklog_zh.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/docs/project_research_and_worklog_zh.md)

### 18 · 连续120秒 · 一次初始化

**Joint / 120秒 / 无重置 / 无连续GT · 120.00s**

新Joint模型连续执行，未叠加朝向修正。观察动作切换与长期稳定性，也保留低姿态跟随不足。

没有全程连续GT；用于观察动作切换、行为与稳定性，不计入定量跟踪表。

视频：[06_连续120秒_新Joint模型_无朝向修正.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/Demo/06_连续120秒_新Joint模型_无朝向修正.mp4)

证据：[04_Demo观看顺序与证据.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/04_Demo观看顺序与证据.md)；[展示视频来源与逐片指标.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/10_Pipeline原理与消融证据/数据/展示视频来源与逐片指标.json)

### 19 · 最新Joint · 未训练人物侧移

**Human / Joint / DEV / Research35 · 5.20s**

S56侧移，J_r025_t01。q 0.0662rad、heading 8.54°；局部迁移更好，但该DEV已反复用于开发。

q 0.06624rad · XY 0.06906m · heading 8.54°。

视频：[01_新Joint_未训练人物侧移_5秒.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/11_昨夜结果_20261105/Demo/01_新Joint_未训练人物侧移_5秒.mp4)

证据：[01_新Joint_未训练人物侧移_5秒.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/11_昨夜结果_20261105/Demo/01_新Joint_未训练人物侧移_5秒.json)；[00_本轮结果总结.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/11_昨夜结果_20261105/00_本轮结果总结.md)

### 20 · 最新Joint · 11.78秒侧移

**Human / Joint / VAL / Research35 · 11.80s**

S59侧移，J_r05_t0。连续动作可见，实际路程1.9065m / 参考2.8314m，推进不足仍然存在。

q 0.09302rad · XY 0.24203m · heading 14.19°。

视频：[02_新Joint_较长侧移_12秒.mp4](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/11_昨夜结果_20261105/Demo/02_新Joint_较长侧移_12秒.mp4)

证据：[02_新Joint_较长侧移_12秒.json](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/11_昨夜结果_20261105/Demo/02_新Joint_较长侧移_12秒.json)；[00_本轮结果总结.md](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/11_昨夜结果_20261105/00_本轮结果总结.md)

## 定量结果：小幅改善，以及清楚的边界

Research35六臂均完成24k续训。402次计划评估全部执行，其中401次完整，1次触发原始跌倒阈值。402是模型—来源评估次数，不是402个独立视频。

主表使用相同55个DEV/VAL源，来自5人，每片等权。Joint父模型与五个Joint续训均55/55完整。H_t01有一条S59 jogging跌倒，H/J另用共同完整54片比较，同时保留失败计数。

| 模型 | q↓ rad | XY↓ m | heading↓ ° | World MPJPE↓ mm | Root-relative MPJPE↓ mm | 接触F1↑ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Joint父模型 | 0.15289 | 0.12200 | 19.29 | 161.25 | 56.00 | 0.94456 |
| J_r025_t01 | 0.15151 | 0.12277 | 17.99 | 161.71 | 53.98 | 0.94552 |
| J_r05_t01 | 0.15258 | 0.12493 | 18.91 | 162.37 | 56.05 | 0.94502 |
| J_r1_t01 | 0.15288 | 0.12584 | 18.72 | 165.18 | 55.55 | 0.94470 |
| J_r1_t0 | 0.15395 | 0.12391 | 18.73 | 162.24 | 55.29 | 0.94428 |
| J_r05_t0 | 0.15237 | 0.11836 | 18.25 | 156.94 | 55.01 | 0.94383 |

J_r05_t0的世界MPJPE相对父模型降低约2.67%，配对差−4.311mm，人物聚类95%区间[−13.585,+2.922]mm。平均小幅改善尚未形成稳定泛化优势。不同分支在q、方向与世界位置上存在取舍，不能用单一最优指标宣布全面胜出。

H_t01在本轮关闭机器人梯度，但父模型已接受Joint训练，不能称“从未见过机器人域”的纯human-only模型。本轮未新增机器人域保持评估，也没有新的GVHMR融合或heading纠偏；不能把续训收益归因于这些未参与模块。

### 指标怎么读

- **q RMSE**：29关节全时段角度误差的均方根，单位rad。
- **World MPJPE**：G1的29个活动关节link原点在世界坐标下的平均欧氏误差，保留root平移与朝向；无逐帧对齐、Procrustes或DTW。
- **Root-relative MPJPE**：只去各自root平移，仍保留朝向误差。
- **Root XY**：按两个平面坐标与时间平均的RMSE；**heading**为环绕yaw差的绝对均值。
- **接触F1**：ankle-floor法向力大于1N视作接触，再与teacher比较。

这些指标使用同后端teacher实际执行轨迹、50Hz采样与固定G1-29集合。它们不是与论文中不同身体集合、参考、成功筛选或初始化协议可以直接排名的benchmark分数。

## 消融：哪些设计得到支持

### 共享命令可以同时拟合两域

六段TRAIN×2seed，Joint在human/robot输入的q分别为0.02884/0.02803rad。

范围：小集合TRAIN可拟合性。不证明未见人物泛化优势。

### 机器人配对梯度保留机器人输入能力

P0起点、30k、12个TRAIN机器人输入：H→J的q两seed分别为0.30770→0.12607与0.30472→0.12607rad。

范围：已见机器人域保持。55片人域上第一seed收益未在第二seed重复；双域保持与人域泛化需分开。

### 方向需要与实际执行状态对齐

冻结新Joint，12片几何DEV：heading 38.06°→5.23°；速度向量RMSE 0.2608→0.2260m/s。错时heading为53.29°。

范围：TRAIN拟合adapter，固定12片开发评估。9个移动片路径比仍约0.546；没有解决推进距离。

### 目标差分loss的收益依赖机器人权重

相同24k更新，在机器人权重0.5下关闭temporal：43VAL世界MPJPE −7.154mm，人物聚类95%CI [−12.076,−3.103]mm；权重1下差值−2.349mm，CI跨0。

范围：一个续训seed，同Joint父模型，同数据/更新数。目标差分loss匹配标签变化，不是把运动幅度压向零的平滑项。

### 辅助运动预测尚未带来一致收益

control/intent两seed、55片最终比较：整体q均微退，heading略降，XY没有一致收益；推理置零/反序引起的pre和token变化很小。

范围：同父模型control/intent重训＋同checkpoint干预。结构可训练不等于该辅助支路已被充分使用；不把motion intent等同GVHMR输入。

### 视角变化仍是明确挑战

固定旧模型2段同步相机探针：PG1→PG2平均q 0.12470→0.25235rad。

范围：2段短片、固定模型。只是视角敏感性诊断，不是多视角训练结果，更不能代表当前所有模型。

## 当前局限

**全局轨迹仍有误差。** S57 walking在本轮六臂仍约69.6–103.0°偏航，路径约0.896–1.003m，teacher为2.811m。局部动作像，不代表方向和位移正确。

**开发集不等于封存测试。** 55片来自5人，已反复用于开发。最新世界MPJPE平均改善2.67%，人物聚类区间跨0，只有一个续训seed。

**部署输入与训练监督分开。** 主线推理输入为RGB和机器人本体状态；训练使用离线动捕适配及teacher命令。参考姿态初始化、0.5秒lookahead和离线几何会影响真实部署条件。

**长片用于观察，不伪造全片分数。** 45/120秒视频一次初始化连续执行，没有全程连续GT。它们显示行为与稳定性，不构成全片高精度追踪证据。

**跨构型与视觉RL尚在推进。** 尚无本模型跨构型物理追踪成功结论，主要结果也不是端到端PPO。后续优先研究root反馈、速度纠偏、跨视角与外部来源验证。

## 下一步

优先把已有heading反馈接到当前候选，再研究实际状态下的速度纠偏；随后扩大同步双视角验证和外部自然视频覆盖。跨构型物理追踪与视觉RL保留独立证据要求。进行中的Research36必须以完成后的真实轨迹、分母和失败记录更新本页，准备与连通性小测不能提前写成效果结论。

## 维护约定

1. `evidence.json`保存原始数值，网页显示时再四舍五入。每张表绑定来源与评分范围。
2. 新增demo填写稳定id、报告相对source、绝对source_path、标题、split、overfit、无连续GT标记、评分时段和证据路径。已有原片不改；网页素材可单独压缩并保留源绑定。
3. 20条精选视频与媒体manifest用`source`连接。没有逐片分数的原生链、失败片和长片不凭画面补数值。
4. 当前六段TRAIN字幕已在汇报副本中修正：历史原渲染曾误写DEV，动作轨迹未改。网页以训练配置核实后的标签为准。
5. 同源多个模型、阶段、相机与seed不增加独立人物数。新增结果按日期形成证据快照，保留旧表和旧结论。
6. 网页采用项目进展页语气。作者、机构、论文及代码公开入口仅在有真实可核实信息后添加。
