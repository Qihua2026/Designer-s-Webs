const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const out = path.join(root, 'dist');
const siteUrl = (process.env.DESIGN_ATLAS_URL || '').replace(/\/$/, '');
const assets = [
  'styles.css',
  'site-data.js',
  'app.js',
  'logo.svg',
  'social-card.png',
  'apple-touch-icon.png',
];

fs.mkdirSync(out, { recursive: true });

for (const asset of assets) {
  fs.copyFileSync(path.join(root, asset), path.join(out, asset));
}

for (const page of ['index.html', 'favorites.html']) {
  let html = fs.readFileSync(path.join(root, page), 'utf8');

  if (siteUrl) {
    const pageUrl = page === 'index.html' ? `${siteUrl}/` : `${siteUrl}/favorites.html`;
    html = html
      .replaceAll('content="social-card.png"', `content="${siteUrl}/social-card.png"`)
      .replace('<title>', `<link rel="canonical" href="${pageUrl}"><title>`);
  }

  fs.writeFileSync(path.join(out, page), html);
}

console.log(`Release built in ${out}${siteUrl ? ` for ${siteUrl}` : ' with relative share-image URLs'}.`);
