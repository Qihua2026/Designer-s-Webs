# DESIGN ATLAS · 设计网站集合原型

完整的设计决策、跨电脑接续方式、发布流程与已知限制见 [`../DESIGN-ATLAS-HANDOFF.md`](../DESIGN-ATLAS-HANDOFF.md)。

直接双击 preview.html 即可预览（CSS / JavaScript 已内嵌，离线可用）。
发现页为 index.html，收藏页为 favorites.html；共用 styles.css、site-data.js 和 app.js。preview.html 与 favorites-preview.html 为内嵌资源的预览版。修改源文件后运行 `node build-preview.js` 可重新生成。

## 设计与交互
- 正式名称：DESIGN ATLAS。
- 桌面三栏索引，手机双栏；编辑精选模块已移除。
- 搜索名称、主分类、内容细分类、描述；分类可与搜索叠加。
- 发现页支持网格与列表切换；收藏页固定列表展示。收藏按钮整体 20px，无外边框，内部五角星 12px。
- 「我的收藏」打开独立页面，保留相同页眉和页脚，不含分类 Tab，只显示实际收藏的网站；支持搜索及直接取消收藏。
- 收藏保存在当前浏览器；HTTP 同源页面共享 localStorage。直接打开本地文件时，通过站内导航传递收藏 ID 并存入目标页面，抵消浏览器对不同文件的存储隔离；存储不可用时仍可通过站内导航携带本次收藏。
- / 聚焦搜索，Escape 清空搜索。外部网站在新窗口打开。
- 封面均为原创 HTML/CSS 视觉示意，不是网站截图。
- 当前 23 个网站（含新增 Eleken 与 Design Spells）：用户补充的各批截图已去重合并，包含独立的 DesEngs Inspiration 和 DesEngs Minimum。
- 卡片标签统一为「主分类 · 内容细分类」，不再显示网站自身的视觉风格。
- 分类按用户截图整理，WEB 对应 PAGE INSPIRATION，Loadmore 归入 MOTION。
- Open Motion、Gooey 尚无法确认截图对应的 URL，已收录并标注「链接待确认」。其余新增链接已核对，链接与来源见 site-sources.md。
- 网站数据已从交互逻辑中拆分至 site-data.js，方便后续增补和维护。
- 已补齐页面 description、Open Graph、Twitter Card、SVG favicon、180px Apple Touch Icon 和 1200×630px 分享封面。
- 收藏图标视觉尺寸保持 20px，并通过透明热区提供约 44px 的点击范围。

## 文案语气
- 全站界面使用英文，包括网站简介、内容细分类、搜索、收藏、空状态与无障碍标签；英文简洁而有诗意。
- 更诗意、更浪漫，同时保持克制与务实：标题与介绍围绕目光、心动、漫游与相逢展开，说明仍传达内容，操作名称清楚直接。
- 网站简介说明能找到什么、可作何参考；不以空泛赞美代替内容。
- 导航、分类、搜索、收藏与异常提示优先保证可理解性。
- 封面文字简短；保留网站原名，内容细分类用英文表达原有含义。

## 视觉系统
背景 #f7f7f2，正文 #20211f，次级文字 #6b6c66，分隔线 #d9dad2。
无卡片阴影；通过网格、留白和字体大小建立层级。颜色主要出现在封面。
参考方向：https://www.rebrand.gallery/ 。未复制其布局、代码或作品图片。

## 验证范围
JavaScript 语法、文件依赖与交互逻辑已检查。浏览器工具因 URL 安全策略拒绝打开本地文件，未完成浏览器截图与实际响应式视觉验收。

## 发布文件
部署时至少包含：index.html、favorites.html、styles.css、site-data.js、app.js、logo.svg、social-card.png 和 apple-touch-icon.png。分享封面 SVG 源文件可一并保留。获得正式域名后，应将 Open Graph 图片补成绝对 URL，并添加 canonical URL。

运行 `node build-release.js` 会生成可直接上传的 dist 目录。获得正式网址后，运行 `DESIGN_ATLAS_URL=https://你的网址 node build-release.js`，构建脚本会自动加入 canonical，并把分享图片地址改为绝对 URL。
