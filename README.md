# Cast Iraq — Release V3 (Publish Candidate)

هذه النسخة تلغي كاش وإصدارات Service Worker القديمة تلقائياً وتستخدم assets ذات أسماء Versioned لمنع خلط CSS/JS على GitHub Pages.

# Cast Iraq — Publishable Beta Release

نسخة Beta تجريبية موحدة ومختبرة لمنصة Cast Iraq. تشتغل مباشرة على GitHub Pages بدون Backend خارجي، وتستخدم LocalStorage حتى كل الـworkflow يشتغل فوراً للتجربة والعرض.

## حسابات التجربة
- Talent: `talent@castiraq.demo` / `123456`
- Company: `company@castiraq.demo` / `123456`
- Admin: `admin@castiraq.demo` / `123456`

## الصفحات والوظائف
- Landing Page
- `feed.html` — Discover / Social Portfolio Feed للصور والفيديو والأعمال
- `explore.html` — دليل المواهب + فلاتر
- `talent.html` — بروفايل موهبة + Portfolio Feed + Media + Credits
- `company.html` — صفحة شركة/جهة كاستنغ
- `castings.html` + `casting.html` — Casting Calls + Roles + Apply
- `auth.html` — Login / Signup للموهبة والشركة
- `dashboard.html` — Dashboard مختلفة لـTalent / Company / Admin
- `settings.html` — الحساب والخصوصية والإشعارات
- `shortlist.html` — Client Presentation / Shortlist
- Privacy / Terms / 404
- PWA manifest + Service Worker

## Workflow الشركة
Project → Roles → Submissions → Review/Selected/Consideration → Self-Tape → Callback/Availability/Hold → Booked/Rejected، مع Shortlists وMessages وSchedule Demo.

## Social / Portfolio
الموهبة تگدر تنشر صورة أو فيديو أو Work Credit، ويظهر المحتوى في Discover وبنفس الوقت داخل Portfolio مال البروفايل. الـDemo يدعم Like / Save / Comment وإدارة المنشورات.

## Backend داخل الحزمة
`backend/server.py` + `backend/castiraq_demo.sqlite` عبارة عن API تجريبي فعلي Python/SQLite لاختبار المنطق خارج المتصفح.

## Production Database
مجلد `supabase/` يحتوي:
- PostgreSQL schema
- RLS policies
- Auth signup trigger
- Storage buckets/policies
- Production indexes

راجع `supabase/README.md` للترتيب الصحيح.

## مهم قبل الإطلاق الحقيقي
نسخة GitHub Pages الحالية **Beta/Demo**: بيانات الحسابات والمنشورات محفوظة داخل متصفح كل جهاز وليست مشتركة بين المستخدمين. هذا مناسب للنشر كنسخة تجريبية عامة وعرض المنتج.

حتى تتحول إلى Production متعدد المستخدمين، اربط الواجهة بمشروع Supabase الحقيقي باستخدام Project URL + public anon key بعد تشغيل ملفات SQL. لا تستخدم Service Role داخل الواجهة نهائياً.

## النشر على GitHub Pages
ارفع **محتويات هذا المجلد نفسها** إلى root للـrepository (لا ترفع المجلد الأب). فعّل Pages على `main / root`، وبعد اكتمال الـdeploy افتح `index.html` من رابط GitHub Pages.

## QA
تفاصيل الفحص النهائي داخل `docs/FINAL_QA.md`.
