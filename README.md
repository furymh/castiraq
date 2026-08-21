# Cast Iraq — Final Demo

نسخة تجريبية كاملة تعمل مباشرة على GitHub Pages بدون Backend خارجي، وتستخدم LocalStorage كـ Demo Database حتى تقدر تختبر كل الـworkflow فوراً.

## حسابات التجربة
- Talent: `talent@castiraq.demo` / `123456`
- Company: `company@castiraq.demo` / `123456`
- Admin: `admin@castiraq.demo` / `123456`

## الموجود فعلياً بالنسخة
- Landing page احترافية
- Talent discovery + advanced filters
- Talent public profile
- Casting Calls + role detail + apply
- تسجيل ودخول Talent / Company
- Talent dashboard: profile, opportunities, applications, self-tapes, messages, analytics
- Company dashboard: projects, applicant pipeline, talent search, shortlists, self-tapes, audition schedule, messages
- Admin dashboard: users, verification, moderation, reports, revenue, audit log
- Client shortlist / presentation page
- Settings / privacy / notifications
- PWA manifest + service worker
- Supabase/Postgres production schema + RLS policies

## Demo Database
النسخة المنشورة على GitHub Pages تستخدم `localStorage`، يعني البيانات تتشارك بين صفحات نفس المتصفح لكنها ليست مشتركة بين أجهزة مختلفة. هذا مقصود حتى تكون النسخة التجريبية شغالة فوراً بدون مفاتيح أو خدمة خارجية.

## تحويلها إلى Production حقيقي
1. أنشئ Supabase project.
2. شغّل `supabase/schema.sql` ثم `supabase/rls.sql` في SQL Editor.
3. أنشئ Storage buckets:
   - `profile-media` (public photos / optional public video)
   - `self-tapes` (private)
   - `verification-documents` (private)
   - `project-attachments` (private or signed URLs)
4. اربط Auth + database calls بدل `assets/db.js` local adapter.
5. لا تضع Supabase service-role key في الواجهة؛ فقط anon key. عمليات Admin الحساسة عبر Edge Function / server.

## ملاحظات أمان
- النسخة التجريبية 18+ فقط.
- Self-tapes ووثائق التوثيق لازم تبقى Private في Production.
- Client shortlist العام يفضل استخدام public token + expiry + RPC محدود.
- بيانات الاتصال لا تظهر إلا بموافقة المستخدم.

## النشر على GitHub Pages
ارفع كل الملفات كما هي إلى root للـrepository. GitHub Pages يفتح `index.html` تلقائياً.


## Social Portfolio Feed
تمت إضافة `feed.html`: صور + فيديو + أعمال سابقة + Likes + Saves + Comments + نشر للمواهب + Portfolio داخل البروفايل. نسخة GitHub Pages تستخدم localStorage، وSupabase schema يحتوي الجداول والسياسات اللازمة للإنتاج.
