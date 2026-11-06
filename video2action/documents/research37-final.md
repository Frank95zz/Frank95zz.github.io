# Research37终态：GVHMR全身入口带来人域改善，简单融合尚无收益

2026-11-06核查。队列从11月5日23:37运行至11月6日03:06，约3小时29分；513/513任务完成，三模型均12000更新，156/156物理评估、36个实际mesh MP4。GPU分配合计8.326卡时，包含GPU评估，不等于训练算力利用率。最终报告正常退出。

## 1. 最重要的结论

本轮最有效的是把GVHMR恢复出的全身运动作为真人输入，经过学习式运动编码器进入共享SONIC命令头。GV-only指真人入口不再读取RGB特征；整个模型仍以同动作真人/机器人配对数据做joint训练，机器人入口继续使用RGB，两域共同更新同一个命令头。它不是human-only训练，也不是将teacher轨迹直接播放出来。

对照为相同母模型、相同32 TRAIN片、同采样表和12000更新的RGB续训。以下均为同12 DEV片、5人的平均；DEV未用于本轮训练，但长期参与研究决策，不是独立封存TEST。三路正常真人输入各12/12完整，机器人分支也各12/12完整。

| 指标 | RGB对照 | GV＋RGB | GV全身单入口 |
|---|---:|---:|---:|
| 关节RMSE / rad | 0.1310 | 0.1309 | 0.0986 |
| 世界G1-29 MPJPE / mm | 423.8160 | 428.5890 | 289.3556 |
| Root XY RMSE / m | 0.3513 | 0.3552 | 0.2468 |
| 朝向MAE / 度 | 34.1199 | 35.3936 | 20.5374 |
| 速度向量RMSE / m/s | 0.2596 | 0.2630 | 0.1773 |
| 去root平移G1-29 MPJPE / mm | 76.8960 | 79.9907 | 51.1723 |
| 接触F1 | 0.8383 | 0.8421 | 0.9167 |
| 接触踝部速度代理 / m/s | 0.0679 | 0.0647 | 0.0996 |

GV单入口相对RGB：关节误差−24.72%，世界MPJPE−31.73%，XY误差−29.75%，速度误差−31.71%。12/12片关节误差改善、11/12片速度误差改善、9/12片世界MPJPE改善；XY只有7/12片改善。累计路程比例由57.45%升至79.31%，仍不足。

按5个人物聚类bootstrap，世界MPJPE差值95%区间为[−157.50,−93.91]mm，关节差[−0.04495,−0.02164]rad，XY差[−0.13418,−0.04518]m。朝向均值34.12→20.54°，但差值区间[−32.26,+6.12]°跨0，不能说各人物都稳定受益；单seed小开发集仍需扩证。

GV＋RGB与RGB基本持平，世界MPJPE差+4.77mm、区间[−4.99,+14.48]，本轮没有形成收益。新路线的优势更符合“用运动表示替代人体外观推断”的假设；尚不能归因于GV某一个特征组，因为身体/root/静止概率还没有分组消融。

## 2. 输入消融：确实使用了人体时序信息

同一个GV-only checkpoint，正常时序的世界MPJPE为289.36mm，时间反转后401.55mm，关节误差0.09862→0.13968rad；世界误差差值区间[+22.01,+161.65]mm。将输入置零会造成3/12片跌倒，9个共同完整片的误差也大幅增加。置零是分布外干预，主要证明输入依赖；反转对照更直接支持时序信息被使用。156次评估中的3次物理跌倒全部来自这个置零条件，均保留。

## 3. 仍需解决的问题

- GV-only的机器人分支朝向36.37→42.85°，root-relative MPJPE80.99→91.00mm，存在跨域干扰；不能说两域同时全面变好。
- 接触F1虽提高，接触踝速代理0.0679→0.0996m/s变差。该指标包含脚部滚动，不是精确足底滑移，但提示需要单独检查滑脚，不能以接触F1替代。
- 个别侧移仍偏航，累计路程不足；本轮没有把旧heading反馈修正同时叠加，所以不把它解释成所有root问题已解决。
- 本轮12片主要是walking/jogging/sideways/running-in-spot，最长demo11.8秒；没有新增长段复杂动作或大规模跨数据集泛化证据。
- GVHMR采用已有SIGGRAPH权重和静态相机离线输出，TPAMI独立SLP和官方SONIC人体encoder的精确接口仍是不同后续事项。

## 4. 先看这三段真实机器人Demo

统一三栏：左真人输入、中teacher评分参考、右student实际闭环执行。下面不是中栏teacher的展示成绩。

### 行走与换向，7.52秒，首选

- [GV单入口](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/全身GV单入口_阶段12000_MoVi_F_S57_walking_part2_v1.mp4)
  q=0.0757rad，XY=0.204m，heading=17.75°，路程=2.40/2.81m。
- [RGB对照](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/RGB同预算_阶段12000_MoVi_F_S57_walking_part2_v1.mp4)
  q=0.1454rad，XY=0.353m，heading=73.38°，路程=0.97/2.81m。

### 慢跑与摆臂，8.00秒

- [GV单入口](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/全身GV单入口_阶段12000_MoVi_F_S57_jogging_part2_v1.mp4)
  q=0.0934rad，XY=0.258m，heading=29.07°，路程=3.75/4.60m。
- [RGB对照](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/RGB同预算_阶段12000_MoVi_F_S57_jogging_part2_v1.mp4)
  q=0.1613rad，XY=0.577m，heading=69.54°，路程=2.45/4.60m。

### 侧移，11.80秒

- [GV单入口](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/全身GV单入口_阶段12000_MoVi_F_S59_sideways_part2_v1.mp4)
  q=0.0719rad，XY=0.213m，heading=4.38°，路程=1.82/2.83m。
- [RGB对照](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/RGB同预算_阶段12000_MoVi_F_S59_sideways_part2_v1.mp4)
  q=0.0861rad，XY=0.295m，heading=7.06°，路程=2.28/2.83m。

### 问题案例：侧移偏航，10.24秒

- [GV单入口](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/全身GV单入口_阶段12000_MoVi_F_S55_sideways_part2_v1.mp4)
  q=0.0932rad，XY=0.337m，heading=43.34°，路程=3.20/3.00m。
- [RGB对照](/cephfs_ssd_xumengdi/video2action_migration_20260927/root/autodl-tmp/video2action-rl/科研汇报_20260917至20261103/14_GVHMR全身前端_20261105/Demo/RGB同预算_阶段12000_MoVi_F_S55_sideways_part2_v1.mp4)
  q=0.1100rad，XY=0.471m，heading=9.45°，路程=1.93/3.00m。

S57行走在方向、姿态与推进量上都有改善；S59侧移朝向较稳，但路程1.82/2.83m，短于RGB的2.28m；S55侧移朝向从9.45°退化到43.34°。这些例子共同说明需要同时看关节、root、朝向和路程。对8个实际MP4完成ffprobe和每段6帧抽样审视，连续流畅性仍应直接播放判断。

## 5. 下一步判断

优先保留GV单入口模型，针对实际执行heading、平移幅度和机器人域保持做独立对照；同时扩人物/动作覆盖与封存测试。GV＋RGB当前收益弱，先检查融合权重及梯度使用，再投入更大训练预算。保持同一个固定checkpoint完成姿态/root/静止概率分组干预，随后用重训消融判断各信息的必要性。此处是研究结论，不自动启动新训练。

完整逐片数据：[results.json](/localssd/video2action_part2_20261018/run/research37_20261105/review/results.json)；当前线上网页仍为昨晚发布的快照，本终态文档已同步汇报文件夹。
