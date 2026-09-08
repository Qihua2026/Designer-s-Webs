# DESIGN ATLAS 项目交接文档

> 更新日期：2026-09-07（Asia/Shanghai）<br>
> 当前状态：第一版已公开发布，可继续迭代<br>
> 正式网址：https://the-design-atlas.netlify.app

## 1. 项目是什么

DESIGN ATLAS 是一份持续生长的设计网站索引，收集设计案例、视觉参考与创作工具。产品目标是让设计师快速浏览、筛选和收藏值得再次回看的站点。

当前版本是无后端的静态网站：HTML、CSS 与原生 JavaScript 即可运行，不需要 npm 安装依赖。网站包含发现页和收藏页，共收录 23 个网站。

## 2. 已确认的核心结论

### 品牌

- 正式名称为 **DESIGN ATLAS**。
- 不再使用早期讨论中的中文名称「航集」。
- 最终 Logo 使用 [`prototype/logo.svg`](prototype/logo.svg) 中的单色 SVG 图形；SVG 没有白色背景矩形，可在不同背景中使用。
- Logo 图形与字标在页眉、页脚、favicon、Apple Touch Icon 和社交分享图中保持一致。
- [`prototype/logo-concepts/`](prototype/logo-concepts/) 是过程稿，只作设计记录，不是线上资产。

### 视觉方向

- 参考 Rebrand 的 Editorial / Brand Gallery / Content-first 气质，但不复制其布局、代码或作品图。
- 大幅内容视觉、黑白灰 UI、强网格、大留白、弱化卡片容器，颜色主要来自封面。
- 背景：`#f7f7f2`
- 正文：`#20211f`
- 次级文字：`#6b6c66`
- 分隔线：`#d9dad2`
- 所有 UI 组件圆角统一为 `4px`。
- 桌面端为三栏网站网格；移动端为双栏；发现页可切换网格/列表。
- 封面是原创 HTML/CSS 视觉示意，并非目标网站截图。页脚明确写有：`Original cover artwork, not website screenshots.`

### 文案

- 全站可见文案使用英文。
- 语气：简洁、诗意、浪漫，同时克制、务实。
- Hero 主标题：`Follow your gaze / beyond the known.`，第二行使用衬线斜体和次级文字色。
- 栏目标题：`A little wonder.`
- 页尾主张：`Keep a spark. / Let it grow.`
- 操作类文案保持直接清楚，如 `Discover`、`Saved sites`、`Browse sites`、`Back to top`。
- 卡片说明要讲清网站能提供什么，避免只有抽象赞美。

### 信息架构

- 顶部导航只保留 `Discover` 和 `Saved sites`；`About` 已移除。
- 编辑精选模块已移除。
- 分类不显示数字。
- 封面中的序号与右上角箭头已移除；可访问网站的标题仍保留 `↗`，用于表示外链。
- 卡片底部标签结构为：`主分类 · 内容细分类`。
- 第二标签描述网站的内容，不描述网站自身的视觉风格。例如：`SOCIAL · Social posts / Posters`。
- `AI + Web` 已删除；其中的相关网站并入 `AI + Skill`。
- `Agent Skill` 已改名为 `AI + Skill`。

当前分类：

1. ALL
2. PAGE INSPIRATION
3. SOCIAL
4. DECK
5. BRAND
6. MOTION
7. CREATIVE CODING
8. AI + Skill

## 3. 当前功能

### 发现页

- 文件：[`prototype/index.html`](prototype/index.html)
- 展示全部 21 个网站。
- 可按分类筛选。
- 可搜索网站名称、主分类、内容细分类和描述。
- 分类与搜索可以叠加。
- 支持网格和列表视图切换。
- `/` 聚焦搜索框，`Escape` 清空搜索。
- 外部网站在新窗口打开，并使用 `noopener noreferrer`。
- 未确认 URL 的网站保持可搜索、筛选和收藏，但不会外跳。

### 收藏页

- 文件：[`prototype/favorites.html`](prototype/favorites.html)
- 顶部和页脚与发现页一致。
- 不显示分类 Tab，也不显示视图切换。
- 默认使用列表展示，只呈现用户实际收藏的网站。
- 收藏图标为五角星，视觉区域为 `20px × 20px`，无外边框。
- 已收藏状态为深色实心星。
- 透明点击热区约为 `44px × 44px`，兼顾移动端可用性。
- 收藏页支持搜索和直接取消收藏。

### 收藏数据的边界

- 收藏保存在浏览器 `localStorage`，键名为 `design-atlas-saved`。
- 同一域名、同一浏览器内，发现页和收藏页共享数据。
- 收藏不会同步到其他浏览器、设备或其他用户。
- 清除浏览器网站数据后，收藏会消失。
- 当前没有账号、数据库、云同步或导出功能。
- 直接用 `file://` 打开本地页面时，脚本会在站内导航 URL 中临时携带收藏 ID，以缓解不同本地文件之间的存储隔离。

## 4. 网站数据

网站数据集中维护在 [`prototype/site-data.js`](prototype/site-data.js)，交互逻辑位于 [`prototype/app.js`](prototype/app.js)。新增网站时，不要把数据重新写回 `app.js`。

每个条目的字段：

```js
{
  id: 'unique-id',
  name: 'Website name',
  url: 'https://example.com/' || null,
  category: 'BRAND',
  contentType: 'Rebrands / Visual identity',
  description: 'Short, useful, poetic line.',
  art: 'css-class-name',
  title: 'Cover title',
  label: 'COVER LABEL'
}
```

规则：

- `id` 必须唯一且稳定；修改已有 `id` 会让旧收藏失效。
- `url` 必须使用完整 HTTPS 地址；无法确认时使用 `null`，不要猜。
- `category` 必须与页面现有筛选按钮完全一致。
- `contentType` 描述内容类型，不描述视觉风格。
- 新增 `art` class 后，要在 [`prototype/styles.css`](prototype/styles.css) 增加对应封面样式。
- 数据来源与分类说明记录在 [`prototype/site-sources.md`](prototype/site-sources.md)。

当前 21 个网站：

| 网站 | 分类 | 内容细分类 | 链接状态 |
|---|---|---|---|
| Posts | SOCIAL | Social posts / Posters | 已确认 |
| Logo System | BRAND | Logos / Brand marks | 已确认 |
| Recent | PAGE INSPIRATION | Web design | 已确认 |
| Loadmore | MOTION | Web interaction / Animation | 已确认 |
| Visual Journal | BRAND | Branding / Graphic design | 已确认 |
| DesEngs Inspiration | PAGE INSPIRATION | Websites / Digital experiences | 已确认 |
| Rebrand | BRAND | Rebrands / Visual identity | 已确认 |
| p5.js | CREATIVE CODING | Creative coding / Tutorials | 已确认 |
| Refero | PAGE INSPIRATION | Product UI / User flows | 已确认 |
| Agent Skills Specification | AI + Skill | Skill specification | 已确认 |
| anthropics/skills | AI + Skill | Skill examples / Source code | 已确认 |
| Brand Guidelines | BRAND | Brand manuals / Guidelines | 已确认 |
| Three.js | CREATIVE CODING | Web 3D / Graphics | 已确认 |
| Awesome Copilot Skills | AI + Skill | Community skills | 已确认 |
| Deck Gallery | DECK | Slide decks / Storytelling | 已确认 |
| Open Motion | MOTION | Transitions / UI motion | **待确认 URL** |
| Inspora | SOCIAL | Visual work / Inspiration | 已确认 |
| OpenProcessing | CREATIVE CODING | Code sketches / Source code | 已确认 |
| Vibe Prompts | AI + Skill | UI generation / Prompts | 已确认 |
| DesEngs Minimum | PAGE INSPIRATION | Minimal web design | 已确认 |
| Gooey | AI + Skill | UI effects / Frontend examples | **待确认 URL** |

### 不要误补的链接

- `Open Motion`：搜索可找到同名 AI 视频工具，但无法确认就是原截图中的 Motion Gallery，因此保持 `url: null`。
- `Gooey`：存在多个同名项目，无法仅凭原截图确定目标站点，因此保持 `url: null`。
- 确认前不要根据名称猜 URL。拿到用户确认的网址后，再更新 `site-data.js` 和 `site-sources.md`。

## 5. 关键 UI 规格

- 页面最大宽度：`1700px`
- 桌面水平留白：`48px`
- 中等屏幕水平留白：`28px`
- 移动端水平留白：`20px`
- 移动端断点：`700px`
- 大屏增强断点：`1500px`
- 搜索框：桌面宽 `273px`，高 `36px`；移动端宽 `100%`
- 搜索框默认使用分隔线色，hover / focus 时改为正文深色
- 顶部导航：桌面 `16px / 600`，移动端 `14px / 600`
- 卡片标题：桌面 `16px`，移动端 `16px`
- 卡片说明：桌面 `12px`，移动端 `14px`
- 卡片元信息：移动端 `11px`
- 常用桌面小字号经过调整：原 `10/11px → 12px`、`12px → 14px`、`14px → 16px`
- 所有可聚焦元素都有 `focus-visible` 状态。
- 支持 `prefers-reduced-motion`。

注意：CSS 中保留了一些早期精选模块的样式（如 `.feature-grid`、`.cover`），但当前 HTML 已不使用它们。后续可安全清理，但清理前应做视觉回归检查。

## 6. 文件结构

```text
prototype/
├── index.html                 # 发现页源文件
├── favorites.html             # 收藏页源文件
├── styles.css                 # 全站视觉样式
├── site-data.js               # 21 个网站的数据
├── app.js                     # 搜索、筛选、视图、收藏逻辑
├── logo.svg                   # 最终 Logo
├── social-card.svg            # 分享图源文件
├── social-card.png            # 1200×630 分享图
├── apple-touch-icon.svg       # Apple 图标源文件
├── apple-touch-icon.png       # 180×180 Apple 图标
├── build-preview.js           # 生成离线单文件预览
├── build-release.js           # 生成发布目录
├── preview.html               # 内嵌 CSS/JS 的发现页预览
├── favorites-preview.html     # 内嵌 CSS/JS 的收藏页预览
├── site-sources.md            # 网站来源、分类与链接记录
├── README.md                  # 简要项目说明
├── logo-concepts/             # Logo 过程稿
├── dist/                      # 当前可上传的正式发布版本
└── design-atlas-release.zip   # 仅包含发布文件，不适合继续编辑
```

根目录的本文件是完整交接说明。

## 7. 换电脑后如何继续

### 需要带走什么

要继续修改，必须复制整个 `prototype` 文件夹和本交接文档。不要只复制 `dist` 或 `design-atlas-release.zip`，因为它们主要用于发布，缺少设计过程与维护上下文。

推荐使用同目录生成的 `design-atlas-project-handoff.zip`。解压后即可获得源文件、构建脚本、发布版本和本交接文档。

### 环境要求

- 任意现代浏览器
- Node.js 18 或更高版本，用于运行两个构建脚本
- 不需要运行 `npm install`
- 不需要数据库或环境密钥

### 本地预览

源文件更新后，在 `prototype` 目录运行：

```bash
node build-preview.js
```

然后直接打开：

```text
preview.html
```

收藏页的离线预览为：

```text
favorites-preview.html
```

也可以启动任意静态文件服务器预览 `index.html`，这样浏览器行为更接近线上环境。

### 修改内容后的正确顺序

1. 修改 `index.html`、`favorites.html`、`styles.css`、`site-data.js`、`app.js` 或图片资产。
2. 运行 `node build-preview.js`。
3. 检查桌面与移动端布局。
4. 检查搜索、所有分类、网格/列表切换、收藏与收藏页。
5. 生成正式发布目录。
6. 将整个 `dist` 文件夹上传到 Netlify。
7. 打开线上首页和收藏页复查。

## 8. 构建与发布

### 当前托管信息

- 平台：Netlify
- Netlify 项目名：`the-design-atlas`
- 正式网址：https://the-design-atlas.netlify.app
- 项目状态：Public
- 发布方式：Netlify Drop 手动上传
- 管理入口：https://app.netlify.com/projects/the-design-atlas/overview
- 2026-09-07 已确认：首页、收藏页、Logo、分享封面均返回 HTTP 200。

### 生成正式发布目录

macOS / Linux：

```bash
DESIGN_ATLAS_URL=https://the-design-atlas.netlify.app node build-release.js
```

Windows PowerShell：

```powershell
$env:DESIGN_ATLAS_URL="https://the-design-atlas.netlify.app"
node build-release.js
```

脚本会：

- 创建或更新 `dist/`
- 复制运行所需文件
- 为首页和收藏页加入 canonical URL
- 将 Open Graph / Twitter 分享图片改成正式域名下的绝对地址

不要省略 `DESIGN_ATLAS_URL`。如果省略，构建仍能运行，但分享图片会使用相对地址，也不会生成 canonical。

### 上传 Netlify

1. 打开 Netlify 项目 Overview 或 Deploys。
2. 找到 `Production deploys`。
3. 将整个 `dist` 文件夹拖入 `Drag and drop your project folder here` 区域。
4. 等待新的 Production 记录显示 `Published`。
5. 打开正式网址进行线上检查。

如果以后修改 Netlify 项目名或绑定自有域名，必须用新网址重新运行 `build-release.js` 并再次上传，否则 canonical 和分享图仍会指向旧地址。

## 9. 发布前检查清单

- [ ] `site-data.js` 中为 23 项，或新增数量与页面计数一致
- [ ] 所有 `id` 唯一
- [ ] 所有已确认链接使用 HTTPS
- [ ] Open Motion、Gooey 未在没有证据时补链接
- [ ] 搜索名称、分类、内容细分类和描述均有效
- [ ] 所有分类按钮都能返回正确结果
- [ ] 发现页网格/列表切换正常
- [ ] 收藏星的空心/实心状态正确
- [ ] 收藏页只显示实际收藏的网站
- [ ] 收藏页没有分类 Tab 和视图切换
- [ ] 桌面三栏、移动端双栏没有溢出
- [ ] 搜索框为 `273×36px`（桌面）并有 hover/focus 状态
- [ ] 全站可见文案仍为英文
- [ ] `node build-preview.js` 成功
- [ ] 使用正式网址运行 `build-release.js`
- [ ] Netlify 新版本显示 `Published`
- [ ] 首页、`/favorites.html`、`/social-card.png`、`/logo.svg` 可访问

## 10. 已做过的验证

- JavaScript 语法检查通过：`site-data.js`、`app.js`、`build-preview.js`、`build-release.js`。
- 数据检查通过：21 个唯一条目，其中 19 个 HTTPS 链接、2 个待确认链接。
- 渲染逻辑检查通过：首页 21 张卡片；收藏测试可正确显示指定网站。
- 搜索测试通过：搜索 `visual identity` 可匹配 Rebrand。
- 离线预览检查通过：`preview.html` 和 `favorites-preview.html` 已内嵌 CSS 与 JavaScript。
- 发布包检查通过：包含 8 个必要文件。
- 正式域名检查通过：首页、收藏页、分享图、Logo 均为 HTTP 200。
- 正式页面 canonical 与分享图片已指向 `https://the-design-atlas.netlify.app`。

## 11. 已知限制与风险

1. **收藏不跨设备同步**
   这是纯前端本地收藏。如果需要账号或同步，必须增加后端与用户体系。

2. **两项链接待确认**
   Open Motion 与 Gooey 只能浏览封面和信息，不能外跳。

3. **发布是手动流程**
   当前没有 Git 仓库或 CI。每次修改后必须重新构建并拖拽 `dist`。

4. **GitHub 首次同步状态**
   本地 Git 仓库与远程 `https://github.com/Qihua2026/Designer-s-Webs` 已配置，源文件已整理进入暂存区。完成首次推送后，应以 GitHub 作为跨电脑同步与版本历史的主要来源。

5. **封面不是目标网站截图**
   后续若改用真实截图，需要重新评估图片版权、更新频率、加载性能与压缩策略。

6. **外链可能变化**
   设计资源网站可能迁移、下线或重定向。新增与定期维护时应重新核对链接，并同步更新 `site-sources.md`。

7. **手工维护重复 Logo SVG**
   页眉和页脚内嵌了 Logo path，同时还有独立的 `logo.svg`。若改 Logo，需要同步修改两个 HTML 页面中的内嵌 SVG、独立 Logo、Apple 图标和分享图。

## 12. 推荐的下一轮工作

按优先级排列：

1. 在真实 iPhone 与 Android 浏览器做一次移动端视觉验收。
2. 找到并确认 Open Motion、Gooey 的准确网址。
3. 将项目纳入 Git，避免手动文件版本丢失。
4. 清理 CSS 中不再使用的精选模块样式。
5. 如果收藏成为核心功能，增加导出/导入；跨设备同步放在更后阶段。
6. 网站数量持续增长后，再考虑分页、标签体系或更强的组合筛选。

## 13. 延续设计时应守住的原则

- 内容始终比 UI 更显眼。
- 新增功能不能破坏快速浏览效率。
- 留白、网格和字体层级优先于阴影与装饰容器。
- 颜色应主要服务封面内容，系统 UI 保持克制。
- 诗意用于标题与说明；按钮、搜索、错误和状态必须清楚。
- 不把内容细分类重新写成视觉风格标签。
- 不机械复制 Rebrand。
- 不猜测不确定的网站链接。
