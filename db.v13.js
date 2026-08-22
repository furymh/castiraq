/* SET V13.4 — product architecture data layer */
(function(){
 const DB=window.CastDB;if(!DB)return;
 const now=()=>new Date().toISOString();
 function ensureV13(){
  const s=DB.ensureV12?DB.ensureV12():DB.state(); let ch=false;
  s.v13=s.v13||{}; s.v13_1=s.v13_1||{}; s.v13_2=s.v13_2||{}; s.saved=s.saved||{}; s.invites=s.invites||[]; s.v13_4=s.v13_4||{}; if(s.v13_4.dbVersion!=='13.4'){s.v13_4.dbVersion='13.4';s.v13_4.brand='SET';s.v13_4.migratedAt=now(); if(s.siteSettings&&(!s.siteSettings.siteName||/cast\s*iraq/i.test(s.siteSettings.siteName)))s.siteSettings.siteName='SET'; const au=s.users.find(u=>u.id==='u-admin'); if(au&&/Cast Iraq/i.test(au.name||''))au.name='إدارة SET'; ch=true} if(s.v13_1.dbVersion!=='13.1'){s.v13_1.dbVersion='13.1';s.v13_1.migratedAt=now();ch=true} if(s.v13_2.dbVersion!=='13.2'){s.v13_2.dbVersion='13.2';s.v13_2.migratedAt=now();s.v13_2.uiPrefs=s.v13_2.uiPrefs||{discoverCategory:'all',discoverQuery:'',lastScroll:{}};ch=true}
  if(!s.users.some(u=>u.id==='u-director')){s.users.push({id:'u-director',role:'director',name:'مخرج تجريبي',email:'director@castiraq.demo',password:'123456',city:'بغداد',verified:true,bio:'مخرج إعلانات ومحتوى تجاري',phone:'',createdAt:'2026-08-22'});ch=true}
  const roles=s.platformConfig?.roles||{};
  if(roles&&!roles.director){roles.director={id:'director',name:'Director',enabled:true,permissions:['companies.view','castings.view','applications.view','photo_projects.view','photo_projects.create','photo_projects.edit','storyboards.view','storyboards.create','storyboards.edit','tasks.view','tasks.create','tasks.edit']};ch=true}
  const feats=s.platformConfig?.features||{};
  const defs=[
   ['universal_discover','Universal Discover',['admin','talent','company','photographer','director']],
   ['director_workspace','Director Workspace',['admin','director']],
   ['contextual_inbox','Contextual Inbox',['admin','talent','company','photographer','director']]
  ];
  defs.forEach(([key,label,roles])=>{if(feats&&!feats[key]){feats[key]={key,label,enabled:true,roles,platforms:['desktop','tablet','mobile'],navigation:key!=='director_workspace'};ch=true}})
  if(ch)DB.save(s); return s;
 }
 function toggleSaved(kind,id){const s=ensureV13(),u=DB.currentUser();if(!u)throw new Error('AUTH_REQUIRED');const k=u.id+':'+kind;s.saved[k]=s.saved[k]||[];const i=s.saved[k].indexOf(id);if(i>=0)s.saved[k].splice(i,1);else s.saved[k].push(id);DB.save(s);return s.saved[k].includes(id)}
 function isSaved(kind,id){const s=ensureV13(),u=DB.currentUser();return !!u&&(s.saved[u.id+':'+kind]||[]).includes(id)}
 function createInvite(kind,targetId,projectId=''){const s=ensureV13(),u=DB.currentUser();if(!u)throw new Error('AUTH_REQUIRED');const x={id:'inv-'+Date.now(),fromUserId:u.id,targetType:kind,targetId,projectId,status:'pending',createdAt:now()};s.invites.unshift(x);DB.save(s);return x}
 function conversationsForUser(){const s=ensureV13(),u=DB.currentUser();if(!u)return[];return (s.conversations||[]).filter(c=>(c.members||[]).includes(u.id)).map(c=>{const p=s.castings.find(x=>x.id===c.projectId)||s.photoProjects?.find(x=>x.id===c.projectId);return {...c,contextTitle:p?.title||p?.name||'محادثة'}})}
 function roleHomeData(){const s=ensureV13(),u=DB.currentUser();if(!u)return{};
  if(u.role==='talent'){const t=s.talents.find(x=>x.userId===u.id);return{role:'talent',primary:'Relevant Opportunities',castings:s.castings.filter(x=>x.status==='open').slice(0,3),applications:s.applications.filter(x=>x.talentId===t?.id),notifications:s.notifications.filter(x=>x.userId===u.id&&!x.read)}}
  if(u.role==='photographer'){const ph=s.photographers?.find(x=>x.userId===u.id);return{role:'photographer',projects:(s.photoProjects||[]).filter(x=>x.photographerId===ph?.id),saved:(ph?.savedTalentIds||[]).map(id=>s.talents.find(t=>t.id===id)).filter(Boolean),notifications:s.notifications.filter(x=>x.userId===u.id&&!x.read)}}
  if(u.role==='company'){const c=s.companies.find(x=>x.userId===u.id);const cast=s.castings.filter(x=>x.companyId===c?.id);return{role:'company',castings:cast,applications:s.applications.filter(a=>cast.some(p=>p.id===a.projectId)&&a.status==='to_review'),notifications:s.notifications.filter(x=>x.userId===u.id&&!x.read)}}
  if(u.role==='director'){return{role:'director',projects:(s.photoProjects||[]).slice(0,4),castings:s.castings.slice(0,3),notifications:s.notifications.filter(x=>x.userId===u.id&&!x.read)}}
  return{role:u.role}
 }
 const coreRegister=DB.register; DB.register=function(data){if(data?.role==='director'){const s=ensureV13();if(s.users.some(u=>u.email.toLowerCase()===String(data.email).toLowerCase()))throw new Error('EMAIL_EXISTS');const u={id:'u-'+Date.now(),role:'director',name:data.name,email:String(data.email).toLowerCase(),password:data.password,city:data.city,verified:false,bio:'',phone:'',createdAt:now()};s.users.push(u);DB.save(s);DB.setCurrent?.(u.id);return u}return coreRegister(data)};
 ensureV13(); Object.assign(DB,{ensureV13,toggleSaved,isSaved,createInvite,conversationsForUser,roleHomeData});
})();
