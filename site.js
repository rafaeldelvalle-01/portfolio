// Código compartilhado entre a página Carreira (/) e a página Freela (/freela/)
// animação de entrada ao rolar
(function(){
var rv=document.querySelectorAll("h2,.lead,.box,.card,.tool,.stat,.tl,.case");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(function(){t.classList.remove("rv","in");t.style.transitionDelay=""},1100)}})},{threshold:.12});
 rv.forEach(function(el,k){el.classList.add("rv");el.style.transitionDelay=(k%4)*70+"ms";io.observe(el)})}
})();

// destaque do menu conforme a seção visível
(function(){
var links=[].slice.call(document.querySelectorAll("nav span a[href^='#']"));
var secs=links.map(function(a){return document.getElementById(a.getAttribute("href").slice(1))});
var cur=-1,tk=false;
function upd(){
 tk=false;var y=window.scrollY+120,n=-1;
 for(var i=0;i<secs.length;i++){if(secs[i]&&secs[i].offsetTop<=y)n=i}
 if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)n=secs.length-1;
 if(n===cur)return;cur=n;
 links.forEach(function(a,i){var on=i===n;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")});
}
window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});
window.addEventListener("resize",upd);upd();
})();

// modo escuro
(function(){
var KEY="rdv-theme",root=document.documentElement,bt=document.querySelector(".theme"),mq=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)");
function label(){var d=root.getAttribute("data-theme")==="dark",t=tr(d?"Ativar modo claro":"Ativar modo escuro");bt.setAttribute("aria-label",t);bt.title=t}
function apply(t,save){root.setAttribute("data-theme",t);if(save){try{localStorage.setItem(KEY,t)}catch(e){}}label()}
bt.addEventListener("click",function(){apply(root.getAttribute("data-theme")==="dark"?"light":"dark",true)});
if(mq&&mq.addEventListener)mq.addEventListener("change",function(e){var s=null;try{s=localStorage.getItem(KEY)}catch(x){}if(!s)apply(e.matches?"dark":"light",false)});
I18N.hooks.push(label);label();
})();

// menu hambúrguer (celular)
(function(){
var nav=document.querySelector("nav"),bt=nav.querySelector(".burger");
function set(o){nav.classList.toggle("open",o);bt.setAttribute("aria-expanded",o);bt.setAttribute("aria-label",tr(o?"Fechar menu":"Abrir menu"))}
bt.addEventListener("click",function(){set(!nav.classList.contains("open"))});
[].forEach.call(nav.querySelectorAll("#menu a"),function(a){a.addEventListener("click",function(){set(false)})});
document.addEventListener("click",function(e){if(!nav.contains(e.target))set(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
window.addEventListener("resize",function(){if(window.innerWidth>700)set(false)});
I18N.hooks.push(function(){set(nav.classList.contains("open"))});
})();

I18N.init();

// seletor Carreira | Freela com indicador deslizante
(function(){
var m=document.querySelector(".mode");if(!m)return;
var links=[].slice.call(m.querySelectorAll("a")),ind=document.createElement("i");
ind.className="ind";ind.setAttribute("aria-hidden","true");m.insertBefore(ind,m.firstChild);m.classList.add("js");
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function cur(){return m.querySelector("a.on")||links[0]}
function place(a){ind.style.width=a.offsetWidth+"px";ind.style.transform="translateX("+(a.offsetLeft-3)+"px)"}
function setOn(a){links.forEach(function(l){var on=l===a;l.classList.toggle("on",on);if(on)l.setAttribute("aria-current","page");else l.removeAttribute("aria-current")})}
// ao chegar pela troca de versão, a página entra com um fade suave (o indicador já está no lugar)
var from=null;try{from=sessionStorage.getItem("rdv-mode-from");sessionStorage.removeItem("rdv-mode-from")}catch(e){}
m.classList.add("nt");place(cur());m.offsetWidth;m.classList.remove("nt");
if(from&&!reduce){document.body.classList.add("leaving");requestAnimationFrame(function(){requestAnimationFrame(function(){document.body.classList.remove("leaving")})})}
links.forEach(function(a){a.addEventListener("click",function(e){
 if(a.classList.contains("on")||e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){if(a.classList.contains("on"))e.preventDefault();return}
 var href=a.getAttribute("href"),old=cur().getAttribute("href");
 try{sessionStorage.setItem("rdv-mode-from",old)}catch(x){}
 if(reduce)return;
 e.preventDefault();setOn(a);place(a);
 setTimeout(function(){document.body.classList.add("leaving")},220);
 setTimeout(function(){location.href=href},470);
})});
window.addEventListener("resize",function(){m.classList.add("nt");place(cur());m.offsetWidth;m.classList.remove("nt")});
window.addEventListener("pageshow",function(e){if(e.persisted){document.body.classList.remove("leaving");var h=location.pathname.indexOf("/freela")===0?"/freela/":"/";setOn(links.filter(function(l){return l.getAttribute("href")===h})[0]||cur());m.classList.add("nt");place(cur());m.offsetWidth;m.classList.remove("nt")}});
I18N.hooks.push(function(){m.classList.add("nt");place(cur());m.offsetWidth;m.classList.remove("nt")});
})();
