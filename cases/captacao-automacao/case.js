// Case interativo: simulação local da jornada página > webhook > n8n > planilha.
// Nada é enviado para fora do navegador.
(function(){
var T=window.tr||function(s){return s};
var ORIG={
 instagram:{utm_source:"instagram",utm_medium:"social",utm_campaign:"pos_marketing_2027",utm_term:"",utm_content:"stories"},
 google:{utm_source:"google",utm_medium:"cpc",utm_campaign:"pos_marketing_2027",utm_term:"pos_ead_marketing",utm_content:"anuncio_a"},
 email:{utm_source:"newsletter",utm_medium:"email",utm_campaign:"pos_marketing_2027",utm_term:"",utm_content:"botao_topo"},
 direto:{utm_source:"",utm_medium:"",utm_campaign:"",utm_term:"",utm_content:""}
};
var KEYS=["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];
var CLS={utm_source:"u-s",utm_medium:"u-m",utm_campaign:"u-c",utm_term:"u-t",utm_content:"u-n"};
var cur="instagram",busy=false,timers=[],last=null;
var $=function(s){return document.querySelector(s)};
var site=$("#cx-site"),q=$("#cx-query"),hid=$("#lp-hidden"),hidList=$("#lp-hidden-list"),peek=$("#lp-peek"),
    utm=$("#cx-utm"),json=$("#cx-json"),status=$("#cx-status"),form=$("#lp-f"),thanks=$("#lp-thanks"),rows=$("#cx-rows");
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}

function renderUrl(){
 var o=ORIG[cur];q.textContent="";
 var parts=KEYS.filter(function(k){return o[k]});
 if(!parts.length)return;
 q.appendChild(document.createTextNode("/?"));
 parts.forEach(function(k,i){
  if(i)q.appendChild(document.createTextNode("&"));
  q.appendChild(el("span",CLS[k],k+"="));
  var b=el("b",CLS[k],o[k]);q.appendChild(b);
 });
}
function renderHidden(){
 var o=ORIG[cur];hidList.textContent="";
 KEYS.forEach(function(k){
  var c=el("code",o[k]?"":"none");c.appendChild(el("span",null,k));c.appendChild(el("em",null,o[k]||T("(vazio)")));hidList.appendChild(c);
 });
}
function renderUtm(){
 var o=ORIG[cur];utm.textContent="";
 KEYS.forEach(function(k,i){
  var r=el("div","r");r.style.animationDelay=(reduce?0:i*70)+"ms";
  r.appendChild(el("span","k",k));r.appendChild(el("span","ar"));
  var v=el("span","v "+(o[k]?CLS[k]:"none"),o[k]||T("(vazio)"));r.appendChild(v);utm.appendChild(r);
 });
}
function payload(){
 var f=new FormData(form),o=ORIG[cur],p={nome:f.get("nome"),email:f.get("email"),telefone:f.get("telefone")};
 KEYS.forEach(function(k){p[k]=o[k]});return p;
}
function renderJson(p){
 json.textContent="";
 if(!p){json.appendChild(el("span","c",T("// os dados aparecem aqui quando a inscrição for enviada")));return}
 json.appendChild(document.createTextNode("POST /webhook/inscricoes\n{\n"));
 var ks=Object.keys(p);
 ks.forEach(function(k,i){
  json.appendChild(document.createTextNode("  "));json.appendChild(el("span","k",'"'+k+'"'));
  json.appendChild(document.createTextNode(": "));json.appendChild(el("span","s",'"'+(p[k]||"")+'"'));
  json.appendChild(document.createTextNode(i<ks.length-1?",\n":"\n"));
 });
 json.appendChild(document.createTextNode("}"));
}
function renderAll(){renderUrl();renderHidden();renderUtm();renderJson(last);
 peek.textContent=T(hid.hidden?"Mostrar campos ocultos":"Esconder campos ocultos");
 if(!busy&&!status.classList.contains("ok"))status.textContent=T("Preencha o formulário ao lado e envie para ver a inscrição percorrer a automação.");
}

function scrollSite(id){
 var t=document.getElementById(id);if(!t)return;
 if(site.classList.contains("done"))reset();
 var nav=site.querySelector(".lp-nav");
 var y=t.offsetTop-(nav?nav.offsetHeight:0);
 site.scrollTo({top:Math.max(0,y),behavior:reduce?"auto":"smooth"});
}
function flash(id){var t=document.getElementById(id);if(!t)return;t.classList.remove("lp-flash");void t.offsetWidth;t.classList.add("lp-flash")}
function setPeek(open){hid.hidden=!open;peek.setAttribute("aria-expanded",open);peek.textContent=T(open?"Esconder campos ocultos":"Mostrar campos ocultos")}

// origem
[].forEach.call(document.querySelectorAll("[data-origin]"),function(b){
 b.addEventListener("click",function(){
  cur=b.getAttribute("data-origin");
  [].forEach.call(document.querySelectorAll("[data-origin]"),function(x){x.classList.toggle("on",x===b);x.setAttribute("aria-pressed",x===b)});
  renderUrl();renderHidden();renderUtm();
 });
});
[].forEach.call(document.querySelectorAll("[data-origin]"),function(x){x.setAttribute("aria-pressed",x.classList.contains("on"))});

// navegação dentro do mini site
[].forEach.call(site.querySelectorAll("[data-lp]"),function(a){
 a.addEventListener("click",function(e){e.preventDefault();scrollSite(a.getAttribute("data-lp"))});
});
[].forEach.call(document.querySelectorAll("[data-go]"),function(b){
 b.addEventListener("click",function(){
  scrollSite(b.getAttribute("data-go"));
  if(b.hasAttribute("data-peek"))setPeek(true);
  var fl=b.getAttribute("data-flash");if(fl)setTimeout(function(){flash(fl)},reduce?0:450);
 });
});
peek.addEventListener("click",function(){setPeek(hid.hidden)});

// trilha
function node(i,on){
 var li=document.querySelectorAll(".cx-nodes li")[i];if(li)li.classList.toggle("on",on);
 var wn=document.querySelectorAll(".cx-wn"),wl=document.querySelectorAll(".cx-wl");
 if(i>=1&&wn[i-1])wn[i-1].classList.toggle("on",on);
 if(i>=2&&wl[i-2])wl[i-2].classList.toggle("on",on);
}
function clearTimers(){timers.forEach(clearTimeout);timers=[]}
function reset(){
 clearTimers();busy=false;site.classList.remove("done");thanks.hidden=true;
 for(var i=0;i<4;i++)node(i,false);
 status.classList.remove("ok");status.textContent=T("Preencha o formulário ao lado e envie para ver a inscrição percorrer a automação.");
 [].forEach.call(document.querySelectorAll(".cx-step.hot"),function(s){s.classList.remove("hot")});
}
function hot(id){[].forEach.call(document.querySelectorAll(".cx-step"),function(s){s.classList.toggle("hot",s.id===id)})}
function at(ms,fn){timers.push(setTimeout(fn,reduce?0:ms))}

form.addEventListener("submit",function(e){
 e.preventDefault();if(busy)return;
 var ok=true;
 [].forEach.call(form.querySelectorAll("input"),function(i){
  var bad=!i.value.trim()||(i.type==="email"&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim()));
  i.setAttribute("aria-invalid",bad);if(bad)ok=false;
 });
 if(!ok){status.classList.remove("ok");status.textContent=T("Confira os campos destacados antes de enviar.");return}
 busy=true;var p=payload();last=p;var wide=window.innerWidth>980;
 node(0,true);status.textContent=T("Página: inscrição salva no banco da página e enviada por POST.");
 renderJson(p);
 at(800,function(){node(1,true);status.textContent=T("Webhook: dados recebidos (status 200).");if(wide){hot("s4");document.getElementById("s4").scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"})}});
 at(1600,function(){node(2,true);status.textContent=T("n8n: campos organizados no formato da planilha.")});
 at(2400,function(){
  node(3,true);
  var tr=el("tr","new");
  tr.appendChild(el("td",null,p.nome));
  ["utm_source","utm_medium","utm_campaign"].forEach(function(k){tr.appendChild(el("td",p[k]?null:"cx-empty",p[k]||T("(vazio)")))});
  rows.appendChild(tr);while(rows.children.length>6)rows.removeChild(rows.firstElementChild);
  status.classList.add("ok");
  status.textContent=p.utm_source?T("Inscrição gravada com a origem:")+" "+p.utm_source+" / "+p.utm_medium+" / "+p.utm_campaign:T("Inscrição gravada, mas sem origem: acesso direto.");
  if(wide){hot("s5");document.getElementById("s5").scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"})}
  site.classList.add("done");thanks.hidden=false;site.scrollTo({top:0});busy=false;
 });
});
$("#lp-again").addEventListener("click",function(){reset();scrollSite("lp-form")});
form.addEventListener("input",function(e){if(e.target.getAttribute("aria-invalid")==="true")e.target.setAttribute("aria-invalid","false")});

if(window.I18N&&I18N.hooks)I18N.hooks.push(renderAll);
renderAll();
})();
