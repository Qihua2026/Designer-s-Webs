const STORAGE_KEY='design-atlas-saved';
const onlySaved=document.body.dataset.page==='favorites';
const validSaved=value=>new Set(Array.isArray(value)?value.filter(id=>sites.some(s=>s.id===id)):[]);
let saved=new Set();
function readSaved(){try{saved=validSaved(JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'))}catch{}}
readSaved();
// Local-file origins can isolate storage by filename. Carry bookmarks between our pages.
if(location.protocol==='file:'){
  const url=new URL(location.href);
  if(url.searchParams.has('saved')){
    try{saved=validSaved(JSON.parse(url.searchParams.get('saved')));localStorage.setItem(STORAGE_KEY,JSON.stringify([...saved]))}catch{}
    url.searchParams.delete('saved');
    try{history.replaceState(null,'',url.href)}catch{}
  }
}
let category='ALL';const $=s=>document.querySelector(s);let toastTimer;
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2200)}
function render(){const term=$('#search').value.trim().toLowerCase();const filtered=sites.filter(s=>(category==='ALL'||s.category===category)&&(!onlySaved||saved.has(s.id))&&[s.name,s.category,s.contentType,s.description].join(' ').toLowerCase().includes(term));$('#collection').innerHTML=filtered.map(s=>`<article class="site"><${s.url?'a':'div'} class="site-art ${s.art}" ${s.url?`href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${s.name} (opens in a new tab)"`:`role="img" aria-label="${s.name} cover artwork; link unverified"`}><span class="art-title" aria-hidden="true">${s.title}</span><span class="art-label">${s.label}</span></${s.url?'a':'div'}><div class="site-info"><div><h3>${s.url?`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name} ↗</a>`:s.name}</h3><p>${s.description}</p><div class="site-meta"><span>${s.category}</span><span>·</span><span>${s.contentType}</span>${s.url?'':'<span class="link-pending">· Link unverified</span>'}</div></div><button class="save" data-id="${s.id}" aria-label="${saved.has(s.id)?'Unsave':'Save'} ${s.name}" aria-pressed="${saved.has(s.id)}"><svg class="save-icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 3 2.78 5.63 6.22.91-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z"/></svg></button></div></article>`).join('');$('#result-count').textContent=`${filtered.length} ${filtered.length===1?'site':'sites'}`;$('#saved-count').textContent=saved.size;$('#empty').hidden=filtered.length>0;$('#empty h3').textContent=onlySaved?(saved.size?'No saved sites found':'No saved sites yet'):'No sites found';
$('#empty p').textContent=onlySaved?(saved.size?'Try another word, or clear search to see your saved sites.':'Tap a star. Keep a little inspiration for later.'):'Try another word, or clear filters to see all sites.';
const clear=$('#clear');if(clear)clear.hidden=!term&&category==='ALL';
if(onlySaved){$('#reset').hidden=!term;clear.textContent='Clear search';}
$('#saved-nav').classList.toggle('current',onlySaved);$('#explore').classList.toggle('current',!onlySaved);document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)})}
$('#collection').addEventListener('click',e=>{const b=e.target.closest('.save');if(!b)return;const id=b.dataset.id;const adding=!saved.has(id);adding?saved.add(id):saved.delete(id);let persisted=true;try{localStorage.setItem(STORAGE_KEY,JSON.stringify([...saved]))}catch{persisted=false}render();const nextButton=document.querySelector(`[data-id="${id}"]`)||document.querySelector('.save')||$('#search');nextButton.focus();notify((adding?'Saved':'Removed from saved sites')+(persisted?'':' · Changes could not be stored and may be lost on refresh'))});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;render()}));$('#search').addEventListener('input',render);function reset(){category='ALL';$('#search').value='';render()}const clearButton=$('#clear');if(clearButton)clearButton.addEventListener('click',reset);$('#reset').addEventListener('click',reset);
if(!onlySaved)for(const mode of ['grid','list'])$('#'+mode+'-view').addEventListener('click',()=>{$('#collection').classList.toggle('list',mode==='list');for(const m of ['grid','list']){$('#'+m+'-view').classList.toggle('active',m===mode);$('#'+m+'-view').setAttribute('aria-pressed',m===mode)}});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('#search').focus()}if(e.key==='Escape'&&document.activeElement===$('#search')){$('#search').value='';render();$('#search').blur()}});
document.addEventListener('click',e=>{
  if(location.protocol!=='file:')return;
  const link=e.target.closest('a[href]');
  if(!link)return;
  const url=new URL(link.getAttribute('href'),location.href);
  if(url.protocol!=='file:'||new URL('.',url).href!==new URL('.',location.href).href||!['index.html','favorites.html','preview.html','favorites-preview.html'].includes(url.pathname.split('/').pop()))return;
  if(link.getAttribute('href').startsWith('#'))return;
  url.searchParams.set('saved',JSON.stringify([...saved]));
  link.href=url.href;
});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY||e.key===null){readSaved();render()}});
window.addEventListener('pageshow',e=>{if(e.persisted){readSaved();render()}});
render();
