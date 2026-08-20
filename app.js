
const seedTalents=[
{id:1,name:'سارة أحمد',age:24,city:'بغداد',type:'مودل',exp:'3 سنوات',skills:['Beauty','Fashion','إعلانات'],image:'https://images.pexels.com/photos/31686699/pexels-photo-31686699.jpeg?auto=compress&cs=tinysrgb&w=700',verified:true},
{id:2,name:'علي كريم',age:29,city:'بغداد',type:'ممثل',exp:'5 سنوات',skills:['تمثيل','Commercial','أكشن'],image:'https://images.pexels.com/photos/31538901/pexels-photo-31538901.jpeg?auto=compress&cs=tinysrgb&w=700',verified:true},
{id:3,name:'نور حسن',age:22,city:'أربيل',type:'UGC',exp:'سنتان',skills:['UGC','Beauty','Social'],image:'https://images.pexels.com/photos/7658748/pexels-photo-7658748.jpeg?auto=compress&cs=tinysrgb&w=700',verified:false},
{id:4,name:'مصطفى جاسم',age:34,city:'البصرة',type:'ممثل',exp:'7 سنوات',skills:['دراما','Voice','إعلانات'],image:'https://images.pexels.com/photos/31510091/pexels-photo-31510091.jpeg?auto=compress&cs=tinysrgb&w=700',verified:true},
{id:5,name:'زهراء علي',age:27,city:'النجف',type:'مودل',exp:'4 سنوات',skills:['Lifestyle','Fashion'],image:'https://images.pexels.com/photos/31686699/pexels-photo-31686699.jpeg?auto=compress&cs=tinysrgb&w=700',verified:true},
{id:6,name:'حسين سامر',age:21,city:'بغداد',type:'كومبارس',exp:'سنة',skills:['كومبارس','رياضة'],image:'https://images.pexels.com/photos/15792253/pexels-photo-15792253.jpeg?auto=compress&cs=tinysrgb&w=700',verified:false},
{id:7,name:'ريماس محمد',age:19,city:'بغداد',type:'مودل',exp:'سنة',skills:['Beauty','Jewelry'],image:'https://images.pexels.com/photos/7658748/pexels-photo-7658748.jpeg?auto=compress&cs=tinysrgb&w=700',verified:true},
{id:8,name:'كرار مهدي',age:31,city:'أربيل',type:'ممثل',exp:'6 سنوات',skills:['Comedy','Commercial'],image:'https://images.pexels.com/photos/31438330/pexels-photo-31438330.jpeg?auto=compress&cs=tinysrgb&w=700',verified:true}
];
const seedCastings=[
{id:1,title:'إعلان سيارات',company:'Sparks Production',city:'بغداد',age:'25-35',pay:'500,000 د.ع',status:'active'},
{id:2,title:'حملة Beauty',company:'Glow Agency',city:'بغداد',age:'20-28',pay:'350,000 د.ع',status:'active'},
{id:3,title:'فيديو تطبيق توصيل',company:'Frame House',city:'أربيل',age:'18-30',pay:'250,000 د.ع',status:'active'}
];

const demoUsers=[
{id:'admin-demo',name:'Admin',email:'admin@castiraq.com',password:'1234',role:'admin',city:'بغداد',phone:'',bio:'مالك المنصة'},
{id:'company-demo',name:'Sparks Production',email:'company@castiraq.com',password:'1234',role:'company',city:'بغداد',phone:'',bio:'شركة إنتاج إعلاني'},
{id:'talent-demo',name:'سارة أحمد',email:'talent@castiraq.com',password:'1234',role:'talent',city:'بغداد',phone:'',bio:'مودل إعلانات وBeauty'}
];

function initStore(){
 if(!localStorage.getItem('castiraq_users')) localStorage.setItem('castiraq_users',JSON.stringify(demoUsers));
 if(!localStorage.getItem('castiraq_talents')) localStorage.setItem('castiraq_talents',JSON.stringify(seedTalents));
 if(!localStorage.getItem('castiraq_castings')) localStorage.setItem('castiraq_castings',JSON.stringify(seedCastings));
}
initStore();
const page=document.body.dataset.page;

function toast(msg){
 let t=document.getElementById('toast');
 if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}
 t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)
}
function getUsers(){return JSON.parse(localStorage.getItem('castiraq_users')||'[]')}
function saveUsers(x){localStorage.setItem('castiraq_users',JSON.stringify(x))}
function getCurrent(){const id=localStorage.getItem('castiraq_current');return getUsers().find(u=>u.id===id)}
function setCurrent(u){localStorage.setItem('castiraq_current',u.id)}
function logout(){localStorage.removeItem('castiraq_current');location.href='auth.html#login'}

if(page==='home'){
 const grid=document.getElementById('talentGrid'), search=document.getElementById('searchInput'), city=document.getElementById('cityFilter'), type=document.getElementById('typeFilter');
 function renderTalents(){
  const q=(search.value||'').toLowerCase(),c=city.value,t=type.value;
  const list=seedTalents.filter(x=>(!q||(x.name+' '+x.skills.join(' ')).toLowerCase().includes(q))&&(!c||x.city===c)&&(!t||x.type===t));
  grid.innerHTML=list.map(x=>`<article class="talent-card"><div class="talent-photo"><img src="${x.image}" alt="${x.name}" loading="lazy"></div><div class="talent-body"><div class="talent-top"><b>${x.name}</b><span class="verified">${x.verified?'● موثق':''}</span></div><div class="meta">${x.type} • ${x.age} سنة • ${x.city}</div><div class="meta">خبرة: ${x.exp}</div><div class="tags">${x.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div><div class="card-actions"><a class="btn secondary" href="auth.html#login">عرض</a><button class="btn primary" onclick="location.href='auth.html#login'">Shortlist +</button></div></div></article>`).join('')||'<p>ماكو نتائج مطابقة.</p>';
 }
 [search,city,type].forEach(e=>e.addEventListener('input',renderTalents));renderTalents();
 document.getElementById('castingList').innerHTML=seedCastings.map(c=>`<div class="casting-item"><div><b>${c.title}</b><br><small>${c.company}</small></div><div><small>المدينة</small><br>${c.city}</div><div><small>العمر / الأجر</small><br>${c.age} • ${c.pay}</div><a class="btn primary" href="auth.html#login">قدّم الآن</a></div>`).join('');
 document.getElementById('heroSearchBtn').onclick=()=>{city.value=document.getElementById('heroCity').value;type.value=document.getElementById('heroType').value;renderTalents();document.getElementById('talents').scrollIntoView({behavior:'smooth'})};
}

if(page==='auth'){
 const loginTab=document.getElementById('loginTab'), signupTab=document.getElementById('signupTab'), loginView=document.getElementById('loginView'), signupView=document.getElementById('signupView');
 function showAuth(which){const login=which==='login';loginView.classList.toggle('hidden',!login);signupView.classList.toggle('hidden',login);loginTab.classList.toggle('active',login);signupTab.classList.toggle('active',!login)}
 loginTab.onclick=()=>showAuth('login');signupTab.onclick=()=>showAuth('signup');showAuth(location.hash==='#signup'?'signup':'login');
 window.addEventListener('hashchange',()=>showAuth(location.hash==='#signup'?'signup':'login'));
 document.querySelectorAll('.account-type').forEach(b=>b.onclick=()=>{document.querySelectorAll('.account-type').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('signupType').value=b.dataset.type});
 document.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>{document.getElementById('loginEmail').value=b.dataset.demo;document.getElementById('loginPassword').value='1234'});
 document.getElementById('loginForm').onsubmit=e=>{e.preventDefault();const u=getUsers().find(x=>x.email.toLowerCase()===document.getElementById('loginEmail').value.toLowerCase()&&x.password===document.getElementById('loginPassword').value);if(!u)return alert('الإيميل أو كلمة المرور غير صحيحة');setCurrent(u);location.href='dashboard.html'};
 document.getElementById('signupForm').onsubmit=e=>{e.preventDefault();const email=document.getElementById('signupEmail').value.trim().toLowerCase();let users=getUsers();if(users.some(x=>x.email.toLowerCase()===email))return alert('هذا الإيميل مسجل مسبقاً');const u={id:'u-'+Date.now(),name:document.getElementById('signupName').value.trim(),email,password:document.getElementById('signupPassword').value,role:document.getElementById('signupType').value,city:document.getElementById('signupCity').value,phone:'',bio:'',createdAt:new Date().toISOString()};users.push(u);saveUsers(users);setCurrent(u);location.href='dashboard.html'};
}

const navs={
 admin:[['overview','▦','نظرة عامة'],['users','👥','المستخدمون'],['castings','🎬','الكاستنغ'],['verify','✓','التوثيق'],['revenue','💰','الإيرادات']],
 company:[['overview','▦','نظرة عامة'],['search','🔎','البحث عن مواهب'],['projects','🎬','مشاريعي'],['applicants','👥','المتقدمون'],['shortlists','★','Shortlists']],
 talent:[['overview','▦','نظرة عامة'],['profile','👤','بروفايلي'],['opportunities','🎬','الفرص'],['applications','📄','طلباتي'],['analytics','📊','الإحصائيات']]
};
let currentSection='overview';

function metric(l,v,s){return `<div class="metric"><span>${l}</span><b>${v}</b><small>${s}</small></div>`}
function panel(title,body,action=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${action}</div>${body}</section>`}

if(page==='dashboard'){
 const u=getCurrent();if(!u)location.href='auth.html#login';
 document.getElementById('sideName').textContent=u.name;document.getElementById('sideRole').textContent=u.role;document.getElementById('sideAvatar').textContent=u.name.trim()[0]||'U';
 document.getElementById('logoutBtn').onclick=logout;
 function renderNav(){document.getElementById('sideNav').innerHTML=navs[u.role].map(([id,ic,l])=>`<a href="#" class="side-link ${id===currentSection?'active':''}" data-sec="${id}">${ic} ${l}</a>`).join('');document.querySelectorAll('[data-sec]').forEach(a=>a.onclick=e=>{e.preventDefault();currentSection=a.dataset.sec;renderNav();renderDash()})}
 function renderDash(){
  const c=document.getElementById('dashContent'),title=document.getElementById('dashTitle');
  const titles={overview:'نظرة عامة',users:'المستخدمون',castings:'الكاستنغ',verify:'التوثيق',revenue:'الإيرادات',search:'البحث عن مواهب',projects:'مشاريعي',applicants:'المتقدمون',shortlists:'Shortlists',profile:'بروفايلي',opportunities:'الفرص',applications:'طلباتي',analytics:'الإحصائيات'};title.textContent=titles[currentSection]||'Dashboard';
  if(u.role==='admin') c.innerHTML=adminView(currentSection);
  if(u.role==='company') c.innerHTML=companyView(currentSection);
  if(u.role==='talent') c.innerHTML=talentView(currentSection);
  wireDashActions(u);
 }
 renderNav();renderDash();
}

function adminView(s){
 const users=getUsers();
 if(s==='overview') return `<div class="metrics">${metric('المواهب',users.filter(x=>x.role==='talent').length+5429,'+12%')}${metric('الشركات',users.filter(x=>x.role==='company').length+819,'+6%')}${metric('Casting نشط','147','+18')}${metric('إيرادات الشهر','18.4M د.ع','+9.2%')}</div><div class="grid-2">${panel('آخر المستخدمين',userTable(users.slice(-6)))}${panel('يحتاج إجراء',`<div class="quick-list"><div class="quick-item"><div><b>23 طلب توثيق</b><small>بانتظار المراجعة</small></div><button class="btn primary" data-action="verify">مراجعة</button></div><div class="quick-item"><div><b>7 بلاغات</b><small>محتوى يحتاج تدقيق</small></div><button class="btn secondary" data-toast="فتح البلاغات">فتح</button></div></div>`)}</div>`;
 if(s==='users') return panel('كل المستخدمين',userTable(users,true));
 if(s==='castings') return panel('Casting Calls',castingTable());
 if(s==='verify') return panel('طلبات التوثيق',`<div class="mini-cards">${['علي كريم','ريم حسن','كرار مهدي'].map(n=>`<div class="mini-card"><h4>${n}</h4><p>هوية + صور + Showreel</p><button class="btn primary" data-toast="تم التوثيق">توثيق</button> <button class="btn danger" data-toast="تم الرفض">رفض</button></div>`).join('')}</div>`);
 if(s==='revenue') return `<div class="metrics">${metric('هذا الشهر','18.4M','+9.2%')}${metric('B2B','8.2M','44%')}${metric('Premium','4.7M','26%')}${metric('Boost/Fees','5.5M','30%')}</div>${panel('مصادر الإيراد',bars([['اشتراكات الشركات',44],['Premium المواهب',26],['Boost',18],['عمولات',12]]))}`;
}
function userTable(users,actions=false){return `<div class="table-wrap"><table><thead><tr><th>الاسم</th><th>الحساب</th><th>المدينة</th><th>الحالة</th>${actions?'<th>إجراء</th>':''}</tr></thead><tbody>${users.map(u=>`<tr><td>${u.name}</td><td>${u.role}</td><td>${u.city||'-'}</td><td><span class="status green">نشط</span></td>${actions?`<td><button class="btn secondary" data-toast="تم فتح الحساب">فتح</button> <button class="btn danger" data-toast="تم إيقاف الحساب تجريبياً">إيقاف</button></td>`:''}</tr>`).join('')}</tbody></table></div>`}
function castingTable(){return `<div class="table-wrap"><table><thead><tr><th>المشروع</th><th>الشركة</th><th>المدينة</th><th>الأجر</th><th>الحالة</th></tr></thead><tbody>${seedCastings.map(c=>`<tr><td>${c.title}</td><td>${c.company}</td><td>${c.city}</td><td>${c.pay}</td><td><span class="status green">نشط</span></td></tr>`).join('')}</tbody></table></div>`}
function bars(rows){return rows.map(([l,v])=>`<div class="bar-row"><div class="bar-label"><span>${l}</span><b>${v}%</b></div><div class="bar"><span style="width:${v}%"></span></div></div>`).join('')}

function companyView(s){
 if(s==='overview') return `<div class="metrics">${metric('مشاريع نشطة','6','+2')}${metric('متقدمون','184','+37')}${metric('Shortlists','12','+3')}${metric('حجوزات','28','+14%')}</div><div class="grid-2">${panel('مشاريعك الحالية',`<div class="quick-list"><div class="quick-item"><div><b>إعلان سيارات</b><small>64 متقدم</small></div><button class="btn primary" data-secgo="applicants">عرض</button></div><div class="quick-item"><div><b>حملة رمضان</b><small>51 متقدم</small></div><button class="btn secondary" data-toast="فتح المشروع">فتح</button></div></div>`)}${panel('أداء الحساب',bars([['اكتمال البروفايل',92],['سرعة الرد',86]]))}</div>`;
 if(s==='search') return panel('البحث عن مواهب',`<div class="filters"><input id="dashSearch" placeholder="اسم أو مهارة"><select><option>كل المدن</option><option>بغداد</option></select><select><option>كل الفئات</option><option>ممثل</option><option>مودل</option></select></div><div class="mini-cards">${seedTalents.map(t=>`<div class="mini-card"><h4>${t.name}</h4><p>${t.type} • ${t.city} • ${t.age} سنة</p><button class="btn primary" data-toast="أضيف للـ Shortlist">+ Shortlist</button></div>`).join('')}</div>`);
 if(s==='projects') return panel('مشاريعي',`<div class="mini-cards">${seedCastings.map(c=>`<div class="mini-card"><h4>${c.title}</h4><p>${c.city} • ${c.pay}</p><button class="btn secondary" data-toast="فتح إدارة المشروع">إدارة</button></div>`).join('')}<div class="mini-card"><h4>+ مشروع جديد</h4><p>انشر Casting Call جديد.</p><button class="btn primary" data-toast="سيتم ربط نموذج النشر بالـBackend لاحقاً">إنشاء</button></div></div>`);
 if(s==='applicants') return panel('المتقدمون',`<div class="table-wrap"><table><thead><tr><th>الاسم</th><th>العمر</th><th>المدينة</th><th>إجراء</th></tr></thead><tbody>${seedTalents.slice(0,5).map(t=>`<tr><td>${t.name}</td><td>${t.age}</td><td>${t.city}</td><td><button class="btn primary" data-toast="أضيف للـ Shortlist">Shortlist</button></td></tr>`).join('')}</tbody></table></div>`);
 if(s==='shortlists') return panel('Shortlists',`<div class="mini-cards">${['إعلان سيارات — 7 مواهب','رمضان — 5 مواهب','Beauty — 9 مواهب'].map(x=>`<div class="mini-card"><h4>${x}</h4><p>قائمة جاهزة للمشاركة مع العميل.</p><button class="btn primary" data-toast="تم نسخ رابط المشاركة">مشاركة</button></div>`).join('')}</div>`);
}
function talentView(s){
 const u=getCurrent();
 if(s==='overview') return `<div class="metrics">${metric('مشاهدات البروفايل','1,284','+18%')}${metric('Shortlists','37','+8')}${metric('طلبات تواصل','14','+3')}${metric('فرص مناسبة','22','جديدة')}</div><div class="grid-2">${panel('فرص مقترحة',`<div class="quick-list">${seedCastings.slice(0,2).map(c=>`<div class="quick-item"><div><b>${c.title}</b><small>${c.city} • ${c.pay}</small></div><button class="btn primary" data-toast="تم التقديم">قدّم</button></div>`).join('')}</div>`)}${panel('قوة البروفايل',bars([['اكتمال البروفايل',88],['الصور',100],['Showreel',60]]))}</div>`;
 if(s==='profile') return panel('بروفايلي',`<div class="form-grid"><label>الاسم<input value="${u.name}"></label><label>المدينة<input value="${u.city}"></label><label>الفئة<select><option>مودل</option><option>ممثل</option><option>UGC</option></select></label><label>العمر<input value="24"></label><label>الطول<input value="168 cm"></label><label>السعر اليومي<input value="350,000 د.ع"></label><label class="full">نبذة<textarea rows="4">${u.bio||''}</textarea></label><div class="full"><button class="btn primary" data-toast="تم حفظ البروفايل تجريبياً">حفظ</button></div></div>`);
 if(s==='opportunities') return panel('فرص الكاستنغ',`<div class="mini-cards">${seedCastings.map(c=>`<div class="mini-card"><h4>${c.title}</h4><p>${c.company}<br>${c.city} • ${c.pay}</p><button class="btn primary" data-toast="تم التقديم">قدّم الآن</button></div>`).join('')}</div>`);
 if(s==='applications') return panel('طلباتي',`<div class="table-wrap"><table><thead><tr><th>المشروع</th><th>الشركة</th><th>الحالة</th></tr></thead><tbody><tr><td>حملة Beauty</td><td>Glow</td><td><span class="status yellow">قيد المراجعة</span></td></tr><tr><td>Jewelry Campaign</td><td>Frame</td><td><span class="status green">Shortlisted</span></td></tr><tr><td>إعلان سيارات</td><td>Sparks</td><td><span class="status red">لم يتم الاختيار</span></td></tr></tbody></table></div>`);
 if(s==='analytics') return `<div class="metrics">${metric('مشاهدات 30 يوم','1,284','+18%')}${metric('ظهور بالبحث','4,620','+22%')}${metric('Shortlists','37','+8')}${metric('Conversion','3.1%','+0.4%')}</div>${panel('مصادر الزيارات',bars([['البحث',58],['Casting Calls',27],['روابط مباشرة',15]]))}`;
}
function wireDashActions(u){
 document.querySelectorAll('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
 document.querySelectorAll('[data-secgo]').forEach(b=>b.onclick=()=>{currentSection=b.dataset.secgo;document.querySelectorAll('[data-sec]').forEach(a=>a.classList.toggle('active',a.dataset.sec===currentSection));document.getElementById('dashTitle').textContent='المتقدمون';document.getElementById('dashContent').innerHTML=companyView(currentSection);wireDashActions(u)});
 document.querySelectorAll('[data-action="verify"]').forEach(b=>b.onclick=()=>{currentSection='verify';document.querySelector('[data-sec="verify"]')?.click()});
}

if(page==='settings'){
 const u=getCurrent();if(!u)location.href='auth.html#login';
 sideName.textContent=u.name;sideRole.textContent=u.role;sideAvatar.textContent=u.name.trim()[0]||'U';document.getElementById('logoutBtn').onclick=logout;
 setName.value=u.name||'';setEmail.value=u.email||'';setCity.value=u.city||'بغداد';setPhone.value=u.phone||'';setBio.value=u.bio||'';setPhoneVisible.checked=!!u.phoneVisible;setCastingNotif.checked=u.castingNotif!==false;setEmailNotif.checked=u.emailNotif!==false;
 accountSettings.onsubmit=e=>{e.preventDefault();let users=getUsers();let i=users.findIndex(x=>x.id===u.id);users[i]={...users[i],name:setName.value,email:setEmail.value,city:setCity.value,phone:setPhone.value,bio:setBio.value,phoneVisible:setPhoneVisible.checked,castingNotif:setCastingNotif.checked,emailNotif:setEmailNotif.checked};saveUsers(users);toast('تم حفظ الإعدادات')};
 changePassBtn.onclick=()=>{const p=prompt('اكتب كلمة المرور الجديدة');if(p&&p.length>=4){let users=getUsers();let i=users.findIndex(x=>x.id===u.id);users[i].password=p;saveUsers(users);toast('تم تغيير كلمة المرور')}};
 deleteAccountBtn.onclick=()=>{if(u.id.endsWith('-demo'))return alert('الحسابات التجريبية الأساسية ما تنحذف. جرّب بحساب جديد.');if(confirm('متأكد من حذف الحساب التجريبي؟')){saveUsers(getUsers().filter(x=>x.id!==u.id));logout()}};
}
