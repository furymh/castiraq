
const navByRole={
 admin:[
  ['overview','▦','نظرة عامة'],['users','👥','المستخدمون'],['castings','🎬','الكاستنغ'],
  ['verification','✓','التوثيق'],['revenue','💰','الإيرادات'],['settings','⚙','الإعدادات']
 ],
 company:[
  ['company-overview','▦','نظرة عامة'],['talent-search','🔎','البحث عن مواهب'],['my-castings','🎬','مشاريعي'],
  ['applicants','👥','المتقدمون'],['shortlists','★','Shortlists'],['billing','💳','الاشتراك']
 ],
 talent:[
  ['talent-overview','▦','نظرة عامة'],['my-profile','👤','بروفايلي'],['opportunities','🎬','الفرص'],
  ['applications','📄','طلباتي'],['analytics','📊','الإحصائيات'],['talent-plan','💎','الباقة']
 ]
};

let currentRole='admin';
let currentPage='overview';

const sampleUsers=[
 ['سارة أحمد','Talent','بغداد','موثق','اليوم'],
 ['Sparks Production','Company','بغداد','موثق','اليوم'],
 ['علي كريم','Talent','بغداد','بانتظار التوثيق','أمس'],
 ['Frame House','Company','أربيل','موثق','أمس'],
 ['نور حسن','Talent','أربيل','جديد','منذ 3 أيام']
];

function setRole(role){
 currentRole=role;
 document.querySelectorAll('.role-btn').forEach(b=>b.classList.toggle('active',b.dataset.role===role));
 currentPage=navByRole[role][0][0];
 document.getElementById('userName').textContent=role==='admin'?'Admin':role==='company'?'Sparks Production':'سارة أحمد';
 document.getElementById('userRole').textContent=role==='admin'?'مالك المنصة':role==='company'?'حساب شركة':'Talent Account';
 renderNav();renderPage();
}

function renderNav(){
 const nav=document.getElementById('sideNav');
 nav.innerHTML=navByRole[currentRole].map(([id,icon,label])=>`
 <button class="nav-item ${id===currentPage?'active':''}" onclick="go('${id}')"><span>${icon}</span>${label}</button>
 `).join('');
}

function go(id){currentPage=id;renderNav();renderPage()}

function metric(label,value,sub,trend='up'){
 return `<div class="metric"><span>${label}</span><strong>${value}</strong><small class="${trend}">${sub}</small></div>`;
}

function panel(title,body,action=''){
 return `<div class="panel"><div class="panel-head"><h3>${title}</h3>${action}</div>${body}</div>`;
}

function renderPage(){
 const c=document.getElementById('content');
 const titles={
  overview:'نظرة عامة',users:'إدارة المستخدمين',castings:'إدارة الكاستنغ',verification:'طلبات التوثيق',revenue:'الإيرادات',settings:'الإعدادات',
  'company-overview':'نظرة عامة','talent-search':'البحث عن مواهب','my-castings':'مشاريع الكاستنغ',applicants:'المتقدمون',shortlists:'Shortlists',billing:'الاشتراك والفوترة',
  'talent-overview':'نظرة عامة','my-profile':'بروفايلي',opportunities:'فرص الكاستنغ',applications:'طلباتي',analytics:'إحصائيات البروفايل','talent-plan':'الباقة'
 };
 document.getElementById('pageTitle').textContent=titles[currentPage]||'Dashboard';

 if(currentPage==='overview') c.innerHTML=adminOverview();
 else if(currentPage==='users') c.innerHTML=usersPage();
 else if(currentPage==='castings') c.innerHTML=castingsPage();
 else if(currentPage==='verification') c.innerHTML=verificationPage();
 else if(currentPage==='revenue') c.innerHTML=revenuePage();
 else if(currentPage==='settings') c.innerHTML=settingsPage();
 else if(currentPage==='company-overview') c.innerHTML=companyOverview();
 else if(currentPage==='talent-search') c.innerHTML=talentSearch();
 else if(currentPage==='my-castings') c.innerHTML=myCastings();
 else if(currentPage==='applicants') c.innerHTML=applicantsPage();
 else if(currentPage==='shortlists') c.innerHTML=shortlistsPage();
 else if(currentPage==='billing') c.innerHTML=billingPage();
 else if(currentPage==='talent-overview') c.innerHTML=talentOverview();
 else if(currentPage==='my-profile') c.innerHTML=talentProfile();
 else if(currentPage==='opportunities') c.innerHTML=opportunitiesPage();
 else if(currentPage==='applications') c.innerHTML=applicationsPage();
 else if(currentPage==='analytics') c.innerHTML=analyticsPage();
 else if(currentPage==='talent-plan') c.innerHTML=talentPlan();
}

function adminOverview(){
 return `
 <div class="metrics">
 ${metric('إجمالي المواهب','5,430','+12% هذا الشهر')}
 ${metric('الشركات والمخرجون','820','+6% هذا الشهر')}
 ${metric('Casting نشط','147','+18 جديد')}
 ${metric('إيرادات الشهر','18.4M د.ع','+9.2%')}
 </div>
 <div class="grid-2">
 ${panel('آخر المستخدمين',`
  <div class="table-wrap"><table><thead><tr><th>الاسم</th><th>النوع</th><th>المدينة</th><th>الحالة</th><th>آخر نشاط</th></tr></thead>
  <tbody>${sampleUsers.map(u=>`<tr><td>${u[0]}</td><td>${u[1]}</td><td>${u[2]}</td><td><span class="status ${u[3]==='موثق'?'green':'yellow'}">${u[3]}</span></td><td>${u[4]}</td></tr>`).join('')}</tbody></table></div>
 `,`<button class="btn secondary" onclick="go('users')">عرض الكل</button>`)}
 ${panel('طلبات تحتاج إجراء',`
  <div class="quick-list">
   <div class="quick-item"><div><b>23 طلب توثيق</b><small>مواهب تنتظر المراجعة</small></div><button class="btn primary" onclick="go('verification')">مراجعة</button></div>
   <div class="quick-item"><div><b>7 بلاغات</b><small>محتوى يحتاج تدقيق</small></div><button class="btn secondary" onclick="toast('فتحت البلاغات')">فتح</button></div>
   <div class="quick-item"><div><b>4 شركات جديدة</b><small>تحتاج اعتماد</small></div><button class="btn secondary" onclick="toast('تم فتح الطلبات')">عرض</button></div>
  </div>
 `)}
 </div>`;
}

function usersPage(){
 return panel('المستخدمون',`
 <div class="table-wrap"><table><thead><tr><th>الاسم</th><th>الحساب</th><th>المدينة</th><th>الحالة</th><th>إجراء</th></tr></thead>
 <tbody>${sampleUsers.concat([['زهراء علي','Talent','النجف','موثق','اليوم'],['Glow Agency','Company','بغداد','موثق','منذ يومين']]).map(u=>`
 <tr><td>${u[0]}</td><td>${u[1]}</td><td>${u[2]}</td><td><span class="status ${u[3]==='موثق'?'green':'yellow'}">${u[3]}</span></td>
 <td><button class="btn secondary" onclick="toast('تم فتح الحساب')">فتح</button> <button class="btn danger" onclick="toast('تم إيقاف الحساب تجريبياً')">إيقاف</button></td></tr>`).join('')}</tbody></table></div>`);
}

function castingsPage(){
 return `<div class="metrics">${metric('النشط','147','+18 جديد')}${metric('مكتمل','1,204','هذا العام')}${metric('إجمالي الطلبات','8,941','+21%')}${metric('معدل التوظيف','34%','+3.4%')}</div>
 ${panel('Casting Calls',`
 <div class="table-wrap"><table><thead><tr><th>المشروع</th><th>الشركة</th><th>المدينة</th><th>المتقدمون</th><th>الحالة</th></tr></thead><tbody>
 <tr><td>إعلان سيارات</td><td>Sparks</td><td>بغداد</td><td>64</td><td><span class="status green">نشط</span></td></tr>
 <tr><td>حملة Beauty</td><td>Glow Agency</td><td>بغداد</td><td>42</td><td><span class="status green">نشط</span></td></tr>
 <tr><td>تطبيق توصيل</td><td>Frame House</td><td>أربيل</td><td>31</td><td><span class="status yellow">قريباً يغلق</span></td></tr>
 </tbody></table></div>`)} `;
}

function verificationPage(){
 return panel('طلبات التوثيق',`
 <div class="cards">
 ${['علي كريم','ريم حسن','كرار مهدي'].map((n,i)=>`<div class="card"><h4>${n}</h4><p>Talent • بغداد<br>تم رفع هوية + صور احترافية + Showreel.</p><div class="card-actions"><button class="btn primary" onclick="toast('تم التوثيق ✓')">توثيق</button><button class="btn danger" onclick="toast('تم الرفض تجريبياً')">رفض</button></div></div>`).join('')}
 </div>`);
}

function revenuePage(){
 return `<div class="metrics">${metric('هذا الشهر','18.4M د.ع','+9.2%')}${metric('اشتراكات شركات','8.2M','44% من الإيراد')}${metric('Premium مواهب','4.7M','26%')}${metric('عمولات/Boost','5.5M','30%')}</div>
 <div class="grid-2">
 ${panel('مصادر الإيراد',`
 <div class="bar-row"><div class="bar-label"><span>اشتراكات الشركات</span><b>44%</b></div><div class="bar"><span style="width:44%"></span></div></div>
 <div class="bar-row"><div class="bar-label"><span>Premium المواهب</span><b>26%</b></div><div class="bar"><span style="width:26%"></span></div></div>
 <div class="bar-row"><div class="bar-label"><span>Boost / Featured</span><b>18%</b></div><div class="bar"><span style="width:18%"></span></div></div>
 <div class="bar-row"><div class="bar-label"><span>عمولات</span><b>12%</b></div><div class="bar"><span style="width:12%"></span></div></div>`)}
 ${panel('أهداف الشهر',`<div class="quick-list"><div class="quick-item"><div><b>الهدف</b><small>25M د.ع</small></div><b>74%</b></div><div class="quick-item"><div><b>عملاء مدفوعون</b><small>212 حساب</small></div><b>+18</b></div></div>`)}
 </div>`;
}

function settingsPage(){
 return panel('إعدادات المنصة',`<div class="form-grid">
 <div><label>اسم المنصة</label><input value="Cast Iraq"></div>
 <div><label>عمولة الحجز %</label><input value="5"></div>
 <div><label>سعر Pro للشركات</label><input value="50,000 د.ع"></div>
 <div><label>سعر Premium للمواهب</label><input value="10,000 د.ع"></div>
 <div class="full"><button class="btn primary" onclick="toast('تم حفظ الإعدادات تجريبياً')">حفظ</button></div>
 </div>`);
}

function companyOverview(){
 return `<div class="metrics">${metric('مشاريع نشطة','6','+2 هذا الشهر')}${metric('متقدمون','184','+37 جديد')}${metric('Shortlists','12','3 مشتركة مع العميل')}${metric('حجوزات ناجحة','28','+14%')}</div>
 <div class="grid-2">${panel('مشاريعك الحالية',`
 <div class="quick-list">
 <div class="quick-item"><div><b>إعلان سيارات</b><small>64 متقدم • بغداد</small></div><button class="btn primary" onclick="go('applicants')">المتقدمون</button></div>
 <div class="quick-item"><div><b>حملة رمضان</b><small>51 متقدم • بغداد</small></div><button class="btn secondary" onclick="toast('تم فتح المشروع')">فتح</button></div>
 </div>`)}
 ${panel('أداء الحساب',`<div class="bar-row"><div class="bar-label"><span>اكتمال البروفايل</span><b>92%</b></div><div class="bar"><span style="width:92%"></span></div></div><div class="bar-row"><div class="bar-label"><span>سرعة الرد</span><b>86%</b></div><div class="bar"><span style="width:86%"></span></div></div>`)}
 </div>`;
}

function talentSearch(){
 return panel('بحث عن المواهب',`<div class="form-grid"><input placeholder="الاسم أو المهارة"><select><option>كل المدن</option><option>بغداد</option><option>أربيل</option></select><select><option>كل الفئات</option><option>ممثل</option><option>مودل</option></select><select><option>العمر</option><option>18-24</option><option>25-34</option></select><div class="full"><button class="btn primary" onclick="toast('تم تطبيق الفلاتر')">بحث</button></div></div>
 <div class="cards" style="margin-top:16px">
 ${['سارة أحمد','علي كريم','نور حسن','مصطفى جاسم','زهراء علي','كرار مهدي'].map((n,i)=>`<div class="card"><h4>${n}</h4><p>${i%2?'ممثل':'مودل'} • بغداد • ${22+i} سنة</p><div class="card-actions"><button class="btn primary" onclick="toast('تمت الإضافة للـ Shortlist')">+ Shortlist</button><button class="btn secondary" onclick="toast('تم فتح البروفايل')">عرض</button></div></div>`).join('')}
 </div>`);
}

function myCastings(){
 return panel('مشاريع الكاستنغ',`<div class="cards">
 ${[['إعلان سيارات','64 متقدم','نشط'],['حملة رمضان','51 متقدم','نشط'],['Beauty Campaign','42 متقدم','مغلق']].map(x=>`<div class="card"><h4>${x[0]}</h4><p>${x[1]}</p><span class="status ${x[2]==='نشط'?'green':'yellow'}">${x[2]}</span><div class="card-actions"><button class="btn secondary" onclick="toast('تم فتح المشروع')">إدارة</button></div></div>`).join('')}
 </div>`,`<button class="btn primary" onclick="toast('فتح نموذج Casting جديد')">+ مشروع جديد</button>`);
}

function applicantsPage(){
 return panel('المتقدمون — إعلان سيارات',`<div class="table-wrap"><table><thead><tr><th>الاسم</th><th>العمر</th><th>المدينة</th><th>الخبرة</th><th>الإجراء</th></tr></thead><tbody>
 ${['علي كريم','كرار مهدي','مصطفى جاسم','حسين سامر'].map((n,i)=>`<tr><td>${n}</td><td>${25+i*2}</td><td>بغداد</td><td>${2+i} سنوات</td><td><button class="btn primary" onclick="toast('أضيف للـ Shortlist')">Shortlist</button> <button class="btn secondary" onclick="toast('تم الرفض')">رفض</button></td></tr>`).join('')}
 </tbody></table></div>`);
}

function shortlistsPage(){
 return panel('Shortlists',`<div class="cards">${['إعلان سيارات — 7 مواهب','حملة رمضان — 5 مواهب','Beauty — 9 مواهب'].map(x=>`<div class="card"><h4>${x}</h4><p>قائمة مرشحين جاهزة للمشاركة مع العميل.</p><div class="card-actions"><button class="btn primary" onclick="toast('تم نسخ رابط المشاركة')">مشاركة</button><button class="btn secondary" onclick="toast('تم فتح القائمة')">فتح</button></div></div>`).join('')}</div>`);
}

function billingPage(){
 return `<div class="cards">
 <div class="card"><h4>Creator</h4><p>25,000 د.ع / شهر<br>بحث + Shortlists محدودة</p><button class="btn secondary" onclick="toast('تم اختيار الباقة')">اختيار</button></div>
 <div class="card" style="border-color:#ffcc3d"><h4>Pro</h4><p>50,000 د.ع / شهر<br>بحث متقدم + مشاريع + Shortlists</p><button class="btn primary" onclick="toast('هذه باقتك الحالية')">الحالية</button></div>
 <div class="card"><h4>Agency</h4><p>150,000 د.ع / شهر<br>فريق + مشاريع متعددة + تقارير</p><button class="btn secondary" onclick="toast('تم اختيار الباقة')">ترقية</button></div>
 </div>`;
}

function talentOverview(){
 return `<div class="metrics">${metric('مشاهدات البروفايل','1,284','+18%')}${metric('Shortlists','37','+8 جديد')}${metric('طلبات تواصل','14','+3')}${metric('فرص مناسبة','22','جديدة')}</div>
 <div class="grid-2">${panel('فرص مقترحة',`<div class="quick-list"><div class="quick-item"><div><b>حملة Beauty</b><small>بغداد • 350,000 د.ع</small></div><button class="btn primary" onclick="toast('تم التقديم')">قدّم</button></div><div class="quick-item"><div><b>إعلان تطبيق</b><small>بغداد • 300,000 د.ع</small></div><button class="btn primary" onclick="toast('تم التقديم')">قدّم</button></div></div>`)}
 ${panel('قوة البروفايل',`<div class="bar-row"><div class="bar-label"><span>اكتمال البروفايل</span><b>88%</b></div><div class="bar"><span style="width:88%"></span></div></div><p class="muted">أضف Showreel حتى تزيد فرصة ظهورك.</p>`)}
 </div>`;
}

function talentProfile(){
 return panel('بروفايلي',`<div class="profile-box"><div class="profile-avatar">👩🏻</div><div><h3>سارة أحمد</h3><span class="status green">موثق ✓</span></div></div>
 <div class="form-grid"><div><label>الاسم</label><input value="سارة أحمد"></div><div><label>المدينة</label><select><option>بغداد</option></select></div><div><label>العمر</label><input value="24"></div><div><label>الطول</label><input value="168 cm"></div><div><label>الفئة</label><select><option>مودل</option><option>ممثل</option></select></div><div><label>السعر اليومي</label><input value="350,000 د.ع"></div><div class="full"><button class="btn primary" onclick="toast('تم حفظ البروفايل')">حفظ التعديلات</button></div></div>`);
}

function opportunitiesPage(){
 return panel('فرص مناسبة إلك',`<div class="cards">${[['حملة Beauty','350,000 د.ع'],['إعلان مطعم','300,000 د.ع'],['Jewelry Campaign','450,000 د.ع']].map(x=>`<div class="card"><h4>${x[0]}</h4><p>بغداد • يوم تصوير واحد<br>الأجر: ${x[1]}</p><button class="btn primary" onclick="toast('تم التقديم بنجاح')">قدّم الآن</button></div>`).join('')}</div>`);
}

function applicationsPage(){
 return panel('طلباتي',`<div class="table-wrap"><table><thead><tr><th>المشروع</th><th>الشركة</th><th>تاريخ التقديم</th><th>الحالة</th></tr></thead><tbody><tr><td>حملة Beauty</td><td>Glow</td><td>اليوم</td><td><span class="status yellow">قيد المراجعة</span></td></tr><tr><td>Jewelry</td><td>Frame</td><td>أمس</td><td><span class="status green">Shortlisted</span></td></tr><tr><td>إعلان سيارات</td><td>Sparks</td><td>منذ أسبوع</td><td><span class="status red">لم يتم الاختيار</span></td></tr></tbody></table></div>`);
}

function analyticsPage(){
 return `<div class="metrics">${metric('مشاهدات 30 يوم','1,284','+18%')}${metric('ظهور بالبحث','4,620','+22%')}${metric('Shortlists','37','+8')}${metric('Conversion','3.1%','+0.4%')}</div>
 ${panel('مصادر المشاهدات',`<div class="bar-row"><div class="bar-label"><span>البحث</span><b>58%</b></div><div class="bar"><span style="width:58%"></span></div></div><div class="bar-row"><div class="bar-label"><span>Casting Calls</span><b>27%</b></div><div class="bar"><span style="width:27%"></span></div></div><div class="bar-row"><div class="bar-label"><span>روابط مباشرة</span><b>15%</b></div><div class="bar"><span style="width:15%"></span></div></div>`)} `;
}

function talentPlan(){
 return `<div class="cards"><div class="card"><h4>Free</h4><p>بروفايل أساسي + تقديم محدود</p><button class="btn secondary">مجاني</button></div><div class="card" style="border-color:#ffcc3d"><h4>Premium</h4><p>10,000 د.ع / شهر<br>ظهور أعلى + فيديو + إحصائيات</p><button class="btn primary" onclick="toast('تم اختيار Premium')">اشترك</button></div><div class="card"><h4>Boost</h4><p>5,000 د.ع<br>رفع البروفايل لمدة 3 أيام</p><button class="btn secondary" onclick="toast('تم شراء Boost تجريبياً')">Boost</button></div></div>`;
}

function toast(msg){
 const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)
}

document.querySelectorAll('.role-btn').forEach(b=>b.addEventListener('click',()=>setRole(b.dataset.role)));
renderNav();renderPage();
