/* SET V13.4.1 theme engine */
(function(){
 const KEY='set_theme';
 const root=document.documentElement;
 const valid=v=>v==='light'||v==='dark';
 const get=()=>{const saved=localStorage.getItem(KEY);if(valid(saved))return saved;return matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'};
 const icon=t=>t==='dark'?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
 function swapWordmarks(t){document.querySelectorAll('img.set-wordmark').forEach(img=>img.src=t==='dark'?'set-wordmark-light.svg':'set-wordmark-dark.svg')}
 function updateMeta(t){document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.content=t==='dark'?'#0E0E10':'#F4F5F3')}
 function renderButtons(t){document.querySelectorAll('[data-set-theme-toggle]').forEach(b=>{b.innerHTML=icon(t);b.setAttribute('aria-label',t==='dark'?'تفعيل الوضع الفاتح':'تفعيل الوضع الداكن');b.title=t==='dark'?'الوضع الفاتح':'الوضع الداكن'})}
 function apply(t,persist=true){if(!valid(t))t='dark';root.dataset.theme=t;if(persist)localStorage.setItem(KEY,t);swapWordmarks(t);updateMeta(t);renderButtons(t);window.dispatchEvent(new CustomEvent('setthemechange',{detail:{theme:t}}))}
 window.SETTheme={get,apply,toggle:()=>apply(get()==='dark'?'light':'dark')};
 apply(get(),false);
 document.addEventListener('click',e=>{const b=e.target.closest('[data-set-theme-toggle]');if(!b)return;e.preventDefault();apply(root.dataset.theme==='dark'?'light':'dark')});
 document.addEventListener('DOMContentLoaded',()=>{apply(root.dataset.theme||get(),false);if(!document.querySelector('[data-set-theme-toggle]')){const host=document.querySelector('.site-header .nav-actions,.site-header .app-actions');if(host){host.insertAdjacentHTML('afterbegin','<button class="v13-theme-toggle" type="button" data-set-theme-toggle aria-label="تبديل المظهر"></button>')}else if(document.body.dataset.page==='auth'){const b=document.createElement('button');b.className='set-theme-floating';b.type='button';b.dataset.setThemeToggle='';b.setAttribute('aria-label','تبديل المظهر');document.body.append(b)}}renderButtons(root.dataset.theme||get());new MutationObserver(()=>{const t=root.dataset.theme||get();renderButtons(t);swapWordmarks(t)}).observe(document.body,{childList:true,subtree:true})});
})();
