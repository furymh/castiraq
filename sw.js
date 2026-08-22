const CACHE='set-v13-4';
const CORE=['project-workspace.html','photographer-project.html','./','index.html','styles.v10.css','styles.v11.css','styles.v13.css','styles.set.css','db.v10.js','db.v12.js','db.v13.js','app.v13.js','workspace.v12.js','image-placeholder.svg','set-wordmark.svg','set-mark.svg','favicon.svg','set-icon-192.png','set-icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
