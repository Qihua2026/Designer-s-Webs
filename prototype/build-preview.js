const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const data = fs.readFileSync(path.join(root, 'site-data.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

for (const [source, target] of [
  ['index.html', 'preview.html'],
  ['favorites.html', 'favorites-preview.html'],
]) {
  const html = fs.readFileSync(path.join(root, source), 'utf8')
    .replaceAll('href="index.html', 'href="preview.html')
    .replaceAll('href="favorites.html', 'href="favorites-preview.html')
    .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
    .replace(
      '<script src="site-data.js"></script><script src="app.js"></script>',
      `<script>${data}</script><script>${app}</script>`,
    );

  fs.writeFileSync(path.join(root, target), html);
}

console.log('Standalone previews rebuilt.');
