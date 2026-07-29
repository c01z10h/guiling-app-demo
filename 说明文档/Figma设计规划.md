# Figma 设计文件规划 — 归零

> 版本：v1.0  
> 目标：设计师拿到这份文档即可开始搭建 Figma 文件，无需反复沟通  
> 设计系统：禅意玻璃 v1.0  
> 原型参考：`/workspace/prototype-guiling.html`

---

## 0. 文件设置

### 基本信息

| 项目 | 值 |
|------|-----|
| **文件名** | `归零 — Design System & App` |
| **画板尺寸** | 375 × 812 px（iPhone X / 11 Pro） |
| **颜色 Profile** | sRGB |
| **Nudge Amount** | 8px（大 nudge）/ 1px（小 nudge） |
| **字体** | Cormorant Garamond（Google Fonts）/ Noto Sans SC（Google Fonts）/ JetBrains Mono（Google Fonts） |

### 字体安装（Figma 桌面端）

```
Cormorant Garamond: https://fonts.google.com/specimen/Cormorant+Garamond
  → 安装 Light 300, Regular 400, Medium Italic 500

Noto Sans SC: https://fonts.google.com/specimen/Noto+Sans+SC
  → 安装 Light 300, Regular 400

JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono
  → 安装 Regular 400
```

---

## 1. Page 1：🎨 Design Tokens

> 目标：建立所有 Color Styles、Text Styles、Effect Styles。这是整个文件的「单一真相来源」。

### 1.1 Color Styles（17 个）

按 Figma 命名规范创建 Local Styles：

```
bg / primary          #f7f5f0
bg / secondary        #f0ede6
bg / tertiary         #e8e5de
bg / glass-layer      rgba(247,245,240,0.65)

text / primary        #2a2824
text / secondary      #6b6863
text / tertiary       #9c9993
text / on-accent      #ffffff

accent / primary      #5b6e7a
accent / hover        #4a5d68
accent / warm         #b89585
accent / calm         #7a9a8a
accent / soft         #b8b0a4

semantic / success    #6b9a7a
semantic / warning    #d4a853
semantic / error      #c47a6b
```

**操作步骤**：
1. 画 17 个小矩形（60×60），每个填一个色值
2. 选中 → 右侧 Fill 面板 → 点 `⁝⁝⁝⁝` → `+` 创建 Style
3. 命名遵循上述 `/` 分隔规范

### 1.2 Text Styles（9 个）

```
display / xl       Cormorant Garamond  Light 300  40px  1.15  -2%
display / default  Cormorant Garamond  Light 300  32px  1.20  -2%

heading / lg       Noto Sans SC  Regular 400  24px  1.30  0%
heading / default  Noto Sans SC  Regular 400  20px  1.35  0%
heading / sm       Noto Sans SC  Regular 400  17px  1.40  0%

body / default     Noto Sans SC  Light 300    15px  1.60  0%
body / sm          Noto Sans SC  Light 300    13px  1.55  0%

caption / default  Noto Sans SC  Regular 400  11px  1.50  4%

mono / timer       JetBrains Mono  Regular 400  56px  1.00  2%
```

**操作步骤**：
1. 创建 9 个文本图层，填入对应的字体/字重/字号/行高/字间距
2. 选中 → 右侧 Text 面板 → `⁝⁝⁝⁝` → `+` 创建 Style
3. 颜色全部设为 `text/primary`

### 1.3 Effect Styles（4 个）

```
shadow / sm     Drop shadow: X=0 Y=1 Blur=3  #000 4%  +  Drop shadow: X=0 Y=1 Blur=2  #000 3%
shadow / md     Drop shadow: X=0 Y=4 Blur=16 #000 5%  +  Drop shadow: X=0 Y=2 Blur=6  #000 3%
shadow / lg     Drop shadow: X=0 Y=8 Blur=32 #000 6%  +  Drop shadow: X=0 Y=4 Blur=12 #000 3%
shadow / glass  Drop shadow: X=0 Y=2 Blur=20 #000 4%  +  Inner shadow: X=0 Y=1 Blur=0 #fff 60%
```

**注意**：Figma 不支持 `backdrop-filter: blur()`，毛玻璃效果用半透明填充模拟。画板上的毛玻璃区域用 `bg/glass-layer` 填充 + `shadow/glass`。

### 1.4 本页布局

```
┌─────────────────────────────────────┐
│  🎨 Color Styles (4列 × 5行)        │
│  [色块] [色块] [色块] [色块]         │
│  ...                                │
├─────────────────────────────────────┤
│  🔤 Text Styles (纵向排列)           │
│  Display XL (40px)                  │
│  Display Default (32px)             │
│  ...                                │
├─────────────────────────────────────┤
│  ✨ Effect Styles (4个矩形展示)       │
│  [sm] [md] [lg] [glass]             │
└─────────────────────────────────────┘
```

---

## 2. Page 2：🧩 Components

> 目标：创建所有 Master Components，含完整变体和状态。使用 Figma Component Properties 管理变体。

### 2.1 组件清单与规格

#### Component 1：Button / Primary

**变体属性**：Size（lg / md / sm）、State（default / hover / active / disabled）

| Size | Height | Padding H | Font Size | Min Width |
|------|--------|-----------|-----------|-----------|
| lg | 56px | 24px | 17px (heading/sm) | 120px |
| md | 48px | 24px | 13px (body/sm) | 100px |
| sm | 36px | 16px | 11px (caption) | 80px |

| State | Background | Text Color | Shadow | Scale |
|-------|-----------|------------|--------|-------|
| default | accent/primary | text/on-accent | shadow/sm | 100% |
| hover | accent/primary + 8% brightness | text/on-accent | shadow/md | 100% |
| active | accent/primary + 12% brightness | text/on-accent | shadow/sm | 97% |
| disabled | bg/tertiary | text/tertiary | none | 100%, 40% opacity |

**创建方式**：
1. 创建 Variants 组件集（Size × State = 12 个变体）
2. 属性 1：`Size` → lg / md / sm
3. 属性 2：`State` → default / hover / active / disabled
4. 圆角：`radius/md`（8px）

#### Component 2：Button / Ghost

**变体属性**：Size（md / sm）、State（default / hover / active）

| Size | Height | Padding H | Font Size |
|------|--------|-----------|-----------|
| md | 48px | 24px | 13px (body/sm) |
| sm | 36px | 16px | 13px (body/sm) |

| State | Background | Text Color |
|-------|-----------|------------|
| default | transparent | text/secondary |
| hover | bg/secondary | text/primary |
| active | bg/tertiary | text/primary |

#### Component 3：Button / Icon

**变体属性**：Size（md=44px / sm=36px）

| State | Background | Icon Color |
|-------|-----------|------------|
| default | transparent | text/secondary |
| hover | bg/secondary | text/primary |
| active | bg/tertiary（scale 92%） | text/primary |

图标使用 24×24 画板的 SVG 占位（后续替换为实际图标系统）。

#### Component 4：Chip / State

**变体属性**：State（default / hover / selected）

| 属性 | default | hover | selected |
|------|---------|-------|----------|
| Background | bg/secondary | bg/tertiary | accent/primary 10% |
| Border | transparent 1px | accent/soft 1px | accent/primary 1.5px |
| Text Color | text/secondary | text/primary | accent/hover |
| Text Style | body/sm | body/sm | body/sm |

尺寸：高度 56px，内边距 14px 16px，圆角 `radius/lg`（16px）

**8 个实例**（创建后复制 8 份，修改文字）：
紧张焦虑 / 疲惫乏力 / 难以专注 / 烦躁不安 / 难以入眠 / 压力山大 / 迷茫不确定 / 想要保持

#### Component 5：Chip / Time

**变体属性**：State（default / hover / selected）

| 属性 | default | hover | selected |
|------|---------|-------|----------|
| Background | bg/secondary | bg/tertiary | accent/primary 10% |
| Border | transparent | accent/soft 1px | accent/primary 1.5px |
| Number Color | text/secondary | text/primary | accent/primary |
| Label Color | text/secondary | text/primary | accent/primary |

尺寸：高度 56px，内边距 10px 16px，圆角 `radius/md`（8px），最小宽度 64px  
数字字体：JetBrains Mono 15px  
标签字体：caption/default

**4 个实例**：3 / 5 / 10 / 15 分钟

#### Component 6：Card / Recommend（Glass）

**变体属性**：State（default / hover）

| 属性 | default | hover |
|------|---------|-------|
| Background | bg/glass-layer | bg/glass-layer |
| Border | rgba(255,255,255,0.5) 1px | rgba(255,255,255,0.5) 1px |
| Shadow | shadow/glass | shadow/md |
| Scale | 100% | 100%（translateY: -2px 用 Auto Layout offset 模拟） |

尺寸：宽度 fill container，内边距 24px，圆角 `radius/xl`（24px）

**内容结构**（从上到下，Auto Layout gap 16px）：
```
┌──────────────────────────┐
│ [🎯 40×40 icon box]      │  ← bg/secondary, radius/md
│                          │
│ 晨间呼吸练习              │  ← heading/sm, text/primary
│ 5分钟 · 适合工作前        │  ← body/sm, text/secondary
│                          │
│ ⭐ 4.8 · 12.3万人   [开始归零 →] │  ← 左: caption, 右: Button/Primary/md
└──────────────────────────┘
```

#### Component 7：TimerRing

**变体属性**：State（active / paused / completed）

尺寸：240×240px  
环宽度：6px  
环半径：106px

| State | Ring Color | Center Content |
|-------|-----------|----------------|
| active | accent/primary | 计时器数字 + "剩余" |
| paused | accent/soft | 计时器数字 + "已暂停" |
| completed | accent/calm | "✓" + "归零完成" |

数字字体：mono/timer（56px JetBrains Mono）

#### Component 8：FeelingPicker

**变体属性**：无（5 个独立实例用 Component Properties 的 Boolean 控制 selected）

尺寸：每个 52×52px 圆形，间距 8px  
Default：bg/secondary  
Selected：accent/calm 15% + accent/calm 2px border + scale 110%

5 个实例：😣 😔 😐 😊 ☺️（Figma 中直接输入 emoji）

#### Component 9：StreakIndicator

**变体属性**：无（用 Instance 的 Boolean 控制每个 dot 的 done/today/future）

尺寸：圆点 12×12px，间距 6px  
Done：accent/calm  
Today：accent/primary + 外发光  
Future：text/tertiary 30%

#### Component 10：ProgressBar

尺寸：高度 4px，宽度 fill  
Background：bg/tertiary  
Fill：accent/primary（用百分比 Clip Content 实现）

#### Component 11：BottomNav / Item

**变体属性**：State（default / active）

| 属性 | default | active |
|------|---------|--------|
| Icon Color | text/tertiary | accent/primary |
| Text Color | text/tertiary | accent/primary |
| Top Indicator | none | accent/primary 2px 线 |

尺寸：高度 56px + safe area，图标 20×20，文字 caption/default

4 个实例：首页 / 探索 / 记录 / 我的

#### Component 12：Toggle

**变体属性**：State（off / on）

尺寸：48×28px，圆角 14px  
Off：bg/tertiary，旋钮在左  
On：accent/primary，旋钮在右（translateX: 20px）

#### Component 13：SearchBar

尺寸：高度 44px，内边距 12px 16px  
Background：bg/secondary  
圆角：radius/lg  
Placeholder：text/tertiary, body/sm

#### Component 14：CalendarDay

**变体属性**：State（default / done / today / other-month）

尺寸：aspect 1:1，最小 36×36  
Default：透明 + text/secondary  
Done：accent/calm 20% + accent/calm text  
Today：accent/primary 15% + accent/primary text bold  
Other-month：30% opacity

### 2.2 本页布局建议

用 Auto Layout 组织：
- 左侧：组件分类标签
- 右侧：每个组件的所有变体横向排列
- 每个组件下方标注组件名 + 用途

---

## 3. Page 3：📱 Screens — Core Path

> 目标：按 375×812 画板，逐页搭建核心路径的 10 个关键帧。每个画板使用 Page 2 的 Master Components 实例。

### 3.1 画板清单（10 个）

| # | 画板名 | 对应原型页面 | 说明 |
|---|--------|------------|------|
| 1 | **Splash — Default** | screen-splash | 品牌名「归零」+ 标语「随时归零，然后回来」+ 加载条 |
| 2 | **Onboarding — Step 1** | screen-onboarding | 3 步引导的第一步 |
| 3 | **Onboarding — Step 2** | screen-onboarding | 3 步引导的第二步 |
| 4 | **Onboarding — Step 3** | screen-onboarding | 3 步引导的第三步 |
| 5 | **Home — Default** | screen-home | 首页初始状态，推荐卡片隐藏 |
| 6 | **Home — State Selected** | screen-home | 选中「紧张焦虑」→ 推荐卡片浮现 |
| 7 | **Detail — Morning** | screen-detail | 晨间呼吸练习详情 |
| 8 | **Practice — Playing** | screen-practice | 计时器运行中，03:12 剩余 |
| 9 | **Practice — Paused** | screen-practice | 暂停态 |
| 10 | **Complete — Default** | screen-complete | 完成页，感受已选「很平静」 |

### 3.2 每个画板的精确规格

#### 画板 1：Splash — Default

```
375 × 812，背景 bg/primary

垂直居中布局（Auto Layout，gap 48px）：
  [呼吸光晕]          ← 200×200 椭圆，accent/primary 6% opacity
  归零                ← display/xl, text/primary, 字间距 8%
  随时归零，然后回来    ← body/sm, text/tertiary, 字间距 4%
  [加载条]            ← ProgressBar, 40px 宽, 2px 高
```

#### 画板 5：Home — Default

```
375 × 812，背景 bg/primary

ScreenHeader（title="归零"，right=IconButton "⚙"）
  ↓ 24px
"今天也要归零"           ← body/sm, text/tertiary
  ↓ 32px
"我现在感觉…"            ← caption, text/tertiary
  ↓ 8px
[StateChip × 8，2列网格]  ← gap 8px，每个 width fill（约 163px）
  ↓ 24px
"或者，直接选时长"        ← caption, text/tertiary
  ↓ 8px
[TimeChip × 4，横向]      ← gap 8px
  ↓ 16px
（RecommendCard 隐藏）     ← 不在画板上

[StreakIndicator]         ← 底部，3/7 completed
[BottomNav]               ← 固定底部
```

#### 画板 6：Home — State Selected

与画板 5 相同，但：
- 「紧张焦虑」StateChip = selected
- RecommendCard 出现，位于 TimeChip 下方 16px
- 内容：「焦虑释放呼吸 / 5分钟 · 4-7-8 呼吸法帮你平静 / ⭐ 4.7 · 10.1万人」

#### 画板 8：Practice — Playing

```
375 × 812，背景 gradient/calm（渐变填充）

ScreenHeader（title=""，left=IconButton "←"）
  ↓ spacer（flex）
[TimerRing — active]       ← 240×240，数字 "03:12"
  ↓ 48px
"晨间呼吸练习"             ← heading/default, text/primary
  ↓ 16px
"闭上眼睛，回到呼吸…"       ← body/default, text/secondary, max-width 260px, center
  ↓ 48px
[ProgressBar]              ← 240px 宽, 45%
  ↓ 32px
[结束练习] [PlayButton 72px] [spacer 64px]
  ↓ spacer（flex）
```

#### 画板 10：Complete — Default

```
375 × 812，背景 bg/primary

垂直居中（Auto Layout, gap 24px, center）：
  [✓ 80×80 circle]     ← accent/calm 12% bg, accent/calm icon
  归零完成              ← display/default, text/primary
  你练习了 5 分钟        ← body/default, text/secondary
  ↓ 16px
  "这次感觉怎么样？"     ← body/sm, text/secondary
  [FeelingPicker]       ← "☺️" selected
  [StreakIndicator]     ← 3/7
  ↓ 16px
  [Button/Primary/lg "再归零一次"]
  [Button/Ghost/md "回到首页"]
```

### 3.3 连接线（Prototype Mode）

在 Figma 的 Prototype 模式下添加页面跳转：

| 从 | 到 | 触发 | 动画 |
|----|----|------|------|
| Splash | Onboarding Step 1 | After Delay 2.5s | Dissolve 0.3s |
| Onboarding Step 1 | Step 2 | Tap "下一步" | Push 0.3s |
| Onboarding Step 2 | Step 3 | Tap "下一步" | Push 0.3s |
| Onboarding Step 3 | Home Default | Tap "开始归零" | Dissolve 0.3s |
| Home Default | Home Selected | Tap StateChip | Smart Animate 0.2s |
| Home Selected | Detail | Tap RecommendCard 或 "开始归零" | Push 0.3s |
| Detail | Practice Playing | Tap "开始归零" | Dissolve 0.3s |
| Practice Playing | Practice Paused | Tap PlayButton | Smart Animate 0.2s |
| Practice Playing | Complete | After Delay（计时器归零） | Dissolve 0.3s |

---

## 4. Page 4：📱 Screens — Secondary

> 次要页面，每个 1 个画板即可。

| # | 画板名 | 说明 |
|---|--------|------|
| 1 | **Explore — Default** | 搜索栏 + 分类 Chips + 5 个练习列表项 |
| 2 | **Explore — Filtered** | 「晨间唤醒」分类激活，仅显示 2 个练习 |
| 3 | **History — Default** | 统计卡片 + 7 月日历热力图 |
| 4 | **History — Empty** | 空状态：「还没有归零记录」+ CTA |
| 5 | **Profile — Default** | 头像 + 统计 + 4 个菜单项 |
| 6 | **Reminder — Default** | 3 个开关 + 时间选择器 |

---

## 5. Page 5：🔄 User Flows

> 用箭头 + 缩略图方式展示 5 条核心流程。

每条流程：
1. 把涉及的画板缩略图（约 200×433）排列
2. 用箭头连接
3. 标注步骤编号和说明文字

5 条流程：
1. **首次使用**：Splash → Onboarding(3步) → Home → State Selected → Detail → Practice → Complete
2. **日常归零（状态路径）**：Home → State Selected → Detail → Practice → Complete → Home
3. **日常归零（时长路径）**：Home → Time Selected → Detail → Practice → Complete
4. **自由浏览**：Explore → Filter → Detail → Practice → Complete
5. **查看记录**：History → 点击某一天（未来功能）

---

## 6. Page 6：🚀 Handoff

### 6.1 内容

| 区块 | 内容 |
|------|------|
| **Icon Export** | 所有 SVG 图标清单 + 导出规格（24×24, stroke 1.5px） |
| **Asset Export** | 切图清单：Logo、启动图、空状态插图 |
| **Specs** | 3 个关键画板的间距/字号标注（Home / Practice / Complete） |
| **Component Matrix** | 所有组件的状态覆盖矩阵表 |
| **Dev Notes** | 毛玻璃 CSS、字体加载、Safe Area、动效参数 |

### 6.2 图标系统清单

| 图标 | 用途 | 文件 |
|------|------|------|
| 8 个状态图标 | StateChip | state-anxious.svg 等 |
| 4 个导航图标 | BottomNav | nav-home.svg 等 |
| 设置 | TopBar | settings.svg |
| 返回 | TopBar | arrow-left.svg |
| 搜索 | Explore | search.svg |
| 收藏 | Detail | heart.svg |
| 完成 | Complete | check.svg |
| 播放 | Practice | play.svg |
| 暂停 | Practice | pause.svg |

图标规范：24×24 画板，线性风格，stroke 1.5px，`round` cap/join，颜色用 `currentColor`。

### 6.3 切图清单

| 切图 | 尺寸 | 格式 |
|------|------|------|
| App Icon | 1024×1024 | PNG（无透明） |
| Splash 启动图 | 1242×2688 | PNG |
| App Store 截图 ×5 | 1242×2688 | JPG |

---

## 7. 迁移指南：HTML 原型 → Figma

### 7.1 精确数值对照

从 `prototype-guiling.html` 的 CSS 变量到 Figma 的直接映射：

| CSS Variable | Figma Property | 值 |
|-------------|---------------|-----|
| `var(--bg-primary)` | Fill | `#f7f5f0` |
| `var(--space-lg)` | Padding / Gap | `24` |
| `var(--radius-lg)` | Corner radius | `16` |
| `var(--shadow-sm)` | Effects | Drop shadow Y=1 B=3 4% |
| `var(--text-body)` | Font size | `15` |
| `backdrop-filter: blur(20px)` | 无法直接映射 | 用半透明填充 `rgba(247,245,240,0.65)` 近似 |

### 7.2 逐页对照

打开 `prototype-guiling.html` 在浏览器中，按 F12 → 选择元素 → 查看 Computed Styles，将以下数值直接填入 Figma：

- **Width/Height**：查看元素的实际像素尺寸
- **Padding**：查看 `padding-top/right/bottom/left`
- **Gap**：查看 Flexbox/Grid 的 `gap` 值
- **Font**：查看 `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
- **Color**：查看 `color` / `background-color`
- **Border radius**：查看 `border-radius`
- **Box shadow**：查看 `box-shadow`

### 7.3 Auto Layout 对照

HTML 中的 Flexbox/Grid → Figma Auto Layout：

| CSS | Figma Auto Layout |
|-----|-------------------|
| `display: flex; flex-direction: column; gap: 16px` | Direction: Vertical, Gap: 16 |
| `display: flex; flex-direction: row; gap: 8px` | Direction: Horizontal, Gap: 8 |
| `justify-content: center; align-items: center` | Align: Center, Justify: Center |
| `padding: 24px` | Padding: 24 (all sides) |
| `flex: 1` | Fill container (Horizontal + Vertical) |

---

## 8. 设计师工作排期

| 阶段 | 任务 | 预估时间 |
|------|------|---------|
| Day 1 | 文件创建 + Page 1（Styles 全部建好） | 2-3h |
| Day 1-2 | Page 2（14 个 Master Components） | 4-6h |
| Day 2-3 | Page 3（10 个核心路径画板） | 4-6h |
| Day 3 | Page 4（6 个次要画板） | 2-3h |
| Day 4 | Page 5（5 条用户流程） | 1-2h |
| Day 4 | Page 6（Handoff 标注） | 1-2h |
| Day 5 | Prototype 连线 + 整体 Review | 2h |
| **总计** | **6 Pages 完整 Figma 文件** | **约 3-5 天** |

---

> **Figma 文件搭建完成后，开发团队可以直接从 Figma Dev Mode 获取所有 CSS/间距/字号/颜色数值，实现设计→开发零损耗交接。**
