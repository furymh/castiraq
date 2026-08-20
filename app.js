const talents=[
{id:1,name:'سارة أحمد',age:24,city:'بغداد',type:'مودل',exp:'3 سنوات',skills:['إعلانات','Fashion','Beauty'],icon:'👩🏻',verified:true},
{id:2,name:'علي كريم',age:29,city:'بغداد',type:'ممثل',exp:'5 سنوات',skills:['تمثيل','لهجة عراقية','أكشن'],icon:'👨🏻',verified:true},
{id:3,name:'نور حسن',age:22,city:'أربيل',type:'UGC',exp:'سنتان',skills:['UGC','Beauty','Social'],icon:'👩🏼',verified:false},
{id:4,name:'مصطفى جاسم',age:34,city:'البصرة',type:'ممثل',exp:'7 سنوات',skills:['دراما','إعلانات','Voice'],icon:'🧔🏻',verified:true},
{id:5,name:'زهراء علي',age:27,city:'النجف',type:'مودل',exp:'4 سنوات',skills:['Fashion','Lifestyle','إعلانات'],icon:'👩🏻‍🦰',verified:true},
{id:6,name:'حسين سامر',age:21,city:'بغداد',type:'كومبارس',exp:'سنة',skills:['كومبارس','رياضة'],icon:'👦🏻',verified:false},
{id:7,name:'ريماس محمد',age:19,city:'بغداد',type:'مودل',exp:'سنة',skills:['Beauty','Jewelry','Lifestyle'],icon:'👩🏻',verified:true},
{id:8,name:'كرار مهدي',age:31,city:'أربيل',type:'ممثل',exp:'6 سنوات',skills:['تمثيل','Comedy','Commercial'],icon:'👨🏽',verified:true}
];

let castingCalls=[
{title:'إعلان سيارات',company:'Sparks Production',city:'بغداد',age:'25-35',pay:'500,000 د.ع',desc:'مطلوب ممثل رجل لإعلان سيارات.'},
{title:'حملة Beauty',company:'Glow Agency',city:'بغداد',age:'20-28',pay:'350,000 د.ع',desc:'مودل لحملة سوشيال ميديا.'},
{title:'فيديو تطبيق توصيل',company:'Frame House',city:'أربيل',age:'18-30',pay:'250,000 د.ع',desc:'مطلوب UGC Creator يتكلم عربي بطلاقة.'}
];

const talentGrid=document.getElementById('talentGrid');
const searchInput=document.getElementById('searchInput');
const cityFilter=document.getElementById('cityFilter');
const typeFilter=document.getElementById('typeFilter');

function renderTalents(){
 const q=searchInput.value.trim().toLowerCase();
 const city=cityFilter.value;
 const type=typeFilter.value;
 const list=talents.filter(t=>{
   const hay=(t.name+' '+t.skills.join(' ')).toLowerCase();
   return (!q||hay.includes(q))&&(!city||t.city===city)&&(!type||t.type===type);
 });
 talentGrid.innerHTML=list.map(t=>`
 <article class="talent-card">
   <div class="avatar">${t.icon}</div>
   <div class="card-body">
    <div class="card-top"><strong>${t.name}</strong><span class="verified">${t.verified?'● موثق':''}</span></div>
    <div class="meta">${t.type} • ${t.age} سنة • ${t.city}</div>
    <div class="meta">خبرة: ${t.exp}</div>
    <div class="tags">${t.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
    <div class="card-actions">
      <button class="btn primary" onclick="openProfile(${t.id})">عرض البروفايل</button>
      <button class="btn secondary" onclick="showToast('تمت الإضافة إلى الـ Shortlist')">+ Shortlist</button>
    </div>
   </div>
 </article>`).join('') || '<p>ماكو نتائج مطابقة.</p>';
}

function renderCasting(){
 document.getElementById('castingList').innerHTML=castingCalls.map(c=>`
 <div class="casting-item">
   <div><strong>${c.title}</strong><br><small>${c.company}</small></div>
   <div><small>المدينة</small><br>${c.city}</div>
   <div><small>العمر / الأجر</small><br>${c.age} • ${c.pay}</div>
   <button class="btn primary" onclick="showToast('تم التقديم على الفرصة')">قدّم الآن</button>
 </div>`).join('');
}

function openProfile(id){
 const t=talents.find(x=>x.id===id);
 document.getElementById('profileContent').innerHTML=`
 <div class="profile-head">
   <div class="profile-icon">${t.icon}</div>
   <div><h2 style="margin:0">${t.name}</h2><div class="meta">${t.type} • ${t.age} سنة • ${t.city}</div></div>
 </div>
 <p style="color:#b7bac2;line-height:1.9">موهبة مسجلة على المنصة، متاحة لأعمال الإعلانات والمحتوى التجاري.</p>
 <div class="tags">${t.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
 <div style="display:flex;gap:10px;margin-top:22px">
  <button class="btn primary" onclick="showToast('تم إرسال طلب تواصل')">طلب تواصل</button>
  <button class="btn secondary" onclick="showToast('تمت الإضافة إلى الـ Shortlist')">إضافة إلى Shortlist</button>
 </div>`;
 document.getElementById('profileModal').classList.add('show');
}

function closeModal(id){document.getElementById(id).classList.remove('show')}
function showToast(msg){
 const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
 setTimeout(()=>el.classList.remove('show'),1800);
}
function applyHeroSearch(){
 cityFilter.value=document.getElementById('heroCity').value;
 typeFilter.value=document.getElementById('heroType').value;
 renderTalents(); document.getElementById('talents').scrollIntoView({behavior:'smooth'});
}

[searchInput,cityFilter,typeFilter].forEach(el=>el.addEventListener('input',renderTalents));
document.getElementById('openCastingModal').onclick=()=>document.getElementById('castingModal').classList.add('show');
document.getElementById('loginBtn').onclick=()=>showToast('ميزة تسجيل الدخول راح تنربط بالـ Backend بالنسخة التالية');

document.getElementById('castingForm').addEventListener('submit',e=>{
 e.preventDefault();
 castingCalls.unshift({
  title:document.getElementById('castTitle').value,
  company:document.getElementById('castCompany').value,
  city:document.getElementById('castCity').value,
  age:document.getElementById('castAge').value,
  pay:document.getElementById('castPay').value,
  desc:document.getElementById('castDesc').value
 });
 renderCasting(); closeModal('castingModal'); e.target.reset(); showToast('تم نشر فرصة الكاستنغ');
});

renderTalents(); renderCasting();
