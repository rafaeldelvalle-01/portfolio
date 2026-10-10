// EDITE AQUI: projetos de design. Para abrir o projeto dentro do site, adicione imgs:gal("pasta","Prefixo",quantidade), que lê projetos/pasta/Prefixo 1, Prefixo 2...
var PROJ="projetos/"; // pasta das imagens no repositório
function gal(f,p,n){var a=[];for(var i=1;i<=n;i++)a.push(PROJ+f+"/"+p+" "+i);return a}
var B="https://mir-s3-cdn-cf.behance.net/projects/404/",G="https://www.behance.net/gallery/";
var designs=[
{t:"AIYE",c:"Branding", img:"5493c2256887541.Y3JvcCwyMTE0LDE2NTQsMTA5LDA.png",u:"256887541/AIYE-O-Mundo-em-Nos",desc:"Proposta de submarca fictícia para a Natura",imgs:gal("aiye","aiye",11)},
{t:"PowerRev",c:"Design",img:"4db0af224186733.Y3JvcCwyODc2LDIyNTAsNTYyLDA.png",u:"224186733/PowerRev",imgs:gal("powerrev","PowerRev",17)},
{t:"Athon Energia",c:"Design",img:"962493224186803.Y3JvcCwyODc2LDIyNTAsNTYyLDA.png",u:"224186803/Athon-Energia",imgs:gal("athon","Athon",20)},
{t:"Laços | Programa de Saúde Mental",c:"Design",img:"9daf16229244597.Y3JvcCwyODc2LDIyNTAsNTYyLDA.png",u:"229244597/Lacos-Programa-de-Saude-Mental",imgs:gal("lacos","Laços",4)},
{t:"Redesign de aplicativo - Sesc SP",c:"UI/UX",img:"73d0e6224186313.Y3JvcCwxMzExLDEwMjYsMzA1LDA.png",u:"224186313/Redesign-de-aplicativo-Sesc-SP",imgs:gal("sesc","Sesc",5)},
{t:"Criação de site - Encanto do Oriente",c:"Web",img:"dc4684224186497.Y3JvcCw4MTgsNjQwLDcwLDA.png",u:"224186497/Criacao-de-site-Encanto-do-Oriente"},
{t:"Agência Sampa",c:"Design",img:"0ef0a0224186631.Y3JvcCwxMDU4LDgyOCw1Miww.png",u:"224186631/Agencia-Sampa",imgs:gal("sampa","Sampa",9)},
{t:"CazéTV",c:"Design",img:"60591a224186893.Y3JvcCw4MTYsNjM5LDE1OSww.png",u:"224186893/CazTV",imgs:gal("caze","caze",5)},
{t:"LuHen Tattoo",c:"Design",img:"a92755224186679.Y3JvcCw4MTYsNjM5LDE1OSww.png",u:"224186679/LuHen-Tattoo",imgs:gal("luhen","LuHen",6)}
];
// EDITE AQUI: vídeos (cole o link do YouTube em "url")
var videos=[
{title:"Capture o momento | Canon",cat:"Publicidade",desc:"Vídeo Capture o momento, para a Canon.",url:"https://youtu.be/_dUbnyqmets"},
{title:"Saúde Mental Instagram - Post",cat:"Redes sociais",desc:"Vídeo de post para o Instagram sobre saúde mental.",url:"https://youtube.com/shorts/UIpUMSe4ycc"},
{title:"Mulan - Apresentação de Dança",cat:"Cultura",desc:"Registro da apresentação de dança de Mulan.",url:"https://youtube.com/shorts/W7DJ8e4DoP0"},
{title:"Intersolar Athon e PowerRev",cat:"Eventos",desc:"Cobertura da participação da Athon e da PowerRev na Intersolar.",url:"https://youtube.com/shorts/mXuHYjER0Pg"},
{title:"Liderança Athon - Mensagem para os Estagiários",cat:"Institucional",desc:"Mensagem da liderança da Athon direcionada aos estagiários.",url:"https://youtu.be/MPo11PYSWV0"},
{title:"Gamaro Indica - Teatro Maria Della Costa",cat:"Cultura",desc:"Indicação do espetáculo em cartaz no Teatro Maria Della Costa.",url:"https://youtube.com/shorts/Tz6lfzUiB_Q"},
{title:"Podcast - PowerRev",cat:"Institucional",desc:"Corte do podcast da PowerRev.",url:"https://youtube.com/shorts/Etf4lmR1lWg"},
{title:"Animação Logo PowerRev",cat:"Motion",desc:"Animação do logo da PowerRev.",url:"https://youtu.be/qTR5TRRwACI"},
{title:"Marco Legal - Lei 14.300",cat:"Institucional",desc:"Vídeo sobre a Lei 14.300, o marco legal da geração distribuída.",url:"https://youtu.be/N3DUOeJanYE"}
];
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
function yid(u){var m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:""}
function isV(u){return /\/shorts\//.test(u)}
function embed(u){var i=yid(u);return i?"https://www.youtube-nocookie.com/embed/"+i+"?autoplay=1&rel=0":""}
// design cards
var dg=document.getElementById("dgrid");
designs.forEach(function(d,i){var a=document.createElement("a");a.className="card";a.href=G+d.u;a.target="_blank";a.rel="noopener";var has=d.imgs&&d.imgs.length;
 a.innerHTML='<div class="thumb full"><img src="'+(d.cover||B+d.img)+'" alt="Capa do projeto '+esc(d.t)+'" loading="lazy" onerror="this.remove()"></div><div class="body"><span class="tag">'+esc(d.c)+'</span><h3>'+esc(d.t)+'</h3><p>'+(has?"Ver projeto":"Ver no Behance &#8599;")+'</p></div>';
 if(has)a.onclick=function(e){e.preventDefault();openP(i)};dg.appendChild(a)});
// video cards
var vg=document.getElementById("vgrid"),idx=0;
videos.forEach(function(v,i){var b=document.createElement("button");b.className="card";var id=yid(v.url),u="https://i.ytimg.com/vi/"+id+"/hqdefault.jpg";
 b.innerHTML='<div class="thumb"><img class="bg" src="'+u+'" alt="" onerror="this.remove()"><img class="fg'+(isV(v.url)?" v":"")+'" src="'+u+'" alt="Capa do vídeo" onerror="this.remove()"><span class="play">&#9654;</span></div><div class="body"><span class="tag">'+esc(v.cat)+'</span><h3>'+esc(v.title)+'</h3><p>'+esc(v.desc)+'</p></div>';
 b.onclick=function(){openV(i)};vg.appendChild(b)});
function openV(i){idx=(i+videos.length)%videos.length;var v=videos[idx],f=document.getElementById("frame");
 f.className="frame"+(isV(v.url)?" v":"");f.innerHTML='<iframe src="'+embed(v.url)+'" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
 document.getElementById("mt").textContent=v.title;document.getElementById("ms").textContent=v.cat;
 document.getElementById("ext").href=v.url;document.getElementById("modal").classList.add("open")}
function shut(){document.getElementById("frame").innerHTML="";document.getElementById("modal").classList.remove("open")}
document.getElementById("close").onclick=shut;
document.getElementById("prev").onclick=function(){openV(idx-1)};
document.getElementById("next").onclick=function(){openV(idx+1)};
document.addEventListener("keydown",function(e){if(e.key==="Escape")shut()});

var EXTS=["jpg","png","JPG","PNG","jpeg","webp"];
function tryNext(el){var k=+el.dataset.k;if(k>=EXTS.length){el.remove();return}el.dataset.k=k+1;el.src=encodeURI(el.dataset.b)+"."+EXTS[k]}
function openP(i){var d=designs[i];document.getElementById("pt").textContent=d.t;document.getElementById("pl").href=G+d.u;
 var pb=document.getElementById("pbody");pb.innerHTML="";d.imgs.forEach(function(b){var im=document.createElement("img");im.alt=d.t;im.loading="lazy";im.dataset.b=b;im.dataset.k=0;im.onerror=function(){tryNext(im)};pb.appendChild(im);tryNext(im)});
 var m=document.getElementById("pmodal");m.classList.add("open");m.scrollTop=0;document.body.style.overflow="hidden"}
function shutP(){document.getElementById("pmodal").classList.remove("open");document.body.style.overflow=""}
document.getElementById("pclose").onclick=shutP;
document.addEventListener("keydown",function(e){if(e.key==="Escape")shutP()});
// animação de entrada ao rolar
var rv=document.querySelectorAll("h2,.lead,.box,.card,.tool,.stat,.tl");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(function(){t.classList.remove("rv","in");t.style.transitionDelay=""},1100)}})},{threshold:.12});
 rv.forEach(function(el,k){el.classList.add("rv");el.style.transitionDelay=(k%4)*70+"ms";io.observe(el)})}

// ===== SIMULADOR DE ORÇAMENTO =====
// Edite aqui os valores (em R$). v = valor base por unidade; add = soma por unidade;
// mult = multiplicador; flat = valor fixo somado uma vez ao projeto.
var CALC={
 minimo:400,
 faixa:[0.9,1.25],
 urgencia:[{ate:4,m:1.5,l:"Prazo urgente"},{ate:9,m:1.25,l:"Prazo curto"},{ate:19,m:1.1,l:"Prazo apertado"},{ate:99999,m:1,l:"Prazo confortável"}],
 desconto:[{de:10,m:0.8},{de:5,m:0.9}],
 servicos:[
 {id:"edicao",nome:"Edição de vídeo",desc:"Você já tem o material gravado",q:[
  {id:"qtd",t:"Quantos vídeos?",qtd:1,max:20},
  {id:"dur",t:"Duração de cada vídeo",base:1,o:[{l:"Até 1 min",v:450},{l:"1 a 3 min",v:950},{l:"3 a 5 min",v:1500},{l:"5 a 10 min",v:2300}]},
  {id:"mat",t:"Como está o material bruto?",o:[{l:"Organizado e enxuto"},{l:"Muito material, precisa de decupagem",mult:1.2}]},
  {id:"mot",t:"Motion graphics",o:[{l:"Nenhum"},{l:"Básico (títulos, lower thirds, logo)",mult:1.15},{l:"Avançado (animações elaboradas)",mult:1.4}]},
  {id:"leg",t:"Legendas em português",o:[{l:"Não preciso"},{l:"Sim",add:80}]},
  {id:"fmt",t:"Formatos de entrega",o:[{l:"Um formato só"},{l:"16:9 e 9:16",add:150}]},
  {id:"rev",t:"Rodadas de revisão",dica:"1 rodada já está incluída",o:[{l:"1 rodada"},{l:"2 rodadas",flat:200},{l:"3 rodadas",flat:400}]}]},
 {id:"producao",nome:"Vídeo institucional completo",desc:"Roteiro, gravação e edição",q:[
  {id:"niv",t:"Nível de produção",base:1,o:[{l:"Institucional (roteiro, captação, motion básico)",v:3200},{l:"Estratégico (direção dedicada, motion avançado)",v:4500}]},
  {id:"loc",t:"Locais de gravação",o:[{l:"1 local"},{l:"2 locais",flat:600},{l:"3 ou mais",flat:1200}]},
  {id:"cor",t:"Cortes extras para redes sociais",o:[{l:"Nenhum"},{l:"3 cortes",flat:450},{l:"6 cortes",flat:800}]},
  {id:"reg",t:"Onde será a gravação?",o:[{l:"Grande São Paulo"},{l:"Fora de São Paulo (deslocamento à parte)",flat:500}]},
  {id:"rev",t:"Rodadas de revisão",dica:"2 rodadas já estão incluídas",o:[{l:"2 rodadas"},{l:"3 rodadas",flat:200},{l:"4 rodadas",flat:400}]}]},
 {id:"identidade",nome:"Identidade visual",desc:"Logo, paleta, tipografia e manual",q:[
  {id:"esc",t:"O que você precisa?",base:1,o:[{l:"Logo, paleta e tipografia",v:1500},{l:"Identidade completa com manual de marca",v:3200}]},
  {id:"apl",t:"Aplicações da marca",o:[{l:"Nenhuma por enquanto"},{l:"Kit básico (cartão, perfil de redes, timbrado)",flat:600},{l:"Kit completo (papelaria, redes, apresentação)",flat:1400}]},
  {id:"pes",t:"Pesquisa de mercado e naming",o:[{l:"Não preciso"},{l:"Sim",flat:800}]},
  {id:"rev",t:"Rodadas de revisão",dica:"2 rodadas já estão incluídas",o:[{l:"2 rodadas"},{l:"3 rodadas",flat:200},{l:"4 rodadas",flat:400}]}]},
 {id:"artes",nome:"Artes para redes sociais",desc:"Posts, carrosséis e peças de campanha",q:[
  {id:"tip",t:"Tipo de peça",base:1,o:[{l:"Post simples",v:90},{l:"Post elaborado (ilustração, composição)",v:180},{l:"Carrossel",v:100,per:70,sl:"Quantas lâminas por carrossel?",sd:8,sm:15}]},
  {id:"qtd",t:"Quantas peças no total?",dica:"Cada carrossel conta como 1 peça",qtd:1,max:60},
  {id:"mar",t:"Você já tem identidade visual?",o:[{l:"Sim, sigo o manual"},{l:"Não, preciso definir o estilo",mult:1.25}]},
  {id:"ani",t:"Animar as peças?",o:[{l:"Não"},{l:"Sim, animação simples",add:80}]}]},
 {id:"material",nome:"Material gráfico e apresentações",desc:"Flyers, decks, catálogos e e-books",q:[
  {id:"tip",t:"Tipo de material",base:1,o:[{l:"Flyer, cartaz ou banner",v:250},{l:"Apresentação",v:200,per:55,sl:"Quantos slides?",sd:10,sm:60},{l:"Catálogo ou e-book",v:300,per:85,sl:"Quantas páginas?",sd:16,sm:60}]},
  {id:"qtd",t:"Quantos materiais?",qtd:1,max:20},
  {id:"con",t:"Conteúdo e imagens",o:[{l:"Você fornece tudo"},{l:"Preciso de ajuda com textos e imagens",mult:1.25}]},
  {id:"rev",t:"Rodadas de revisão",dica:"2 rodadas já estão incluídas",o:[{l:"2 rodadas"},{l:"3 rodadas",flat:200}]}]},
 {id:"ui",nome:"UI e landing page",desc:"Telas, sites e páginas de venda",q:[
  {id:"esc",t:"Escopo",base:1,o:[{l:"Landing page (1 página longa)",v:2200},{l:"Site institucional",v:1500,per:700,sl:"Quantas páginas?",sd:5,sm:20},{l:"Telas de app",v:500,per:600,sl:"Quantas telas?",sd:5,sm:40}]},
  {id:"ent",t:"Entrega",o:[{l:"Só o design (Figma)"},{l:"Design + publicação (WordPress/Elementor)",mult:1.6}]},
  {id:"txt",t:"Textos do site",o:[{l:"Você fornece"},{l:"Preciso de ajuda com os textos",flat:400}]}]}
 ]
};
(function(){
var C=CALC,root=document.getElementById("calc");
var st={step:1,svc:null,ans:{},qty:1,sub:1,date:"",nodate:false,obs:""};
function E(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function brl(n){return "R$ "+n.toLocaleString("pt-BR",{maximumFractionDigits:0})}
function today(){var d=new Date();d.setHours(0,0,0,0);return d}
function iso(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function days(){if(st.nodate||!st.date)return 99999;var p=st.date.split("-"),d=new Date(+p[0],+p[1]-1,+p[2]);return Math.ceil((d-today())/864e5)}
function bq(){return svc().q.filter(function(x){return x.base})[0]}
function bo(){var q=bq();return q?q.o[st.ans[q.id]]:null}
function qq(){return svc().q.filter(function(x){return x.qtd})[0]}
function svc(){return C.servicos.filter(function(s){return s.id===st.svc})[0]}
function calc(){
 var s=svc(),unit=0,add=0,mult=1,flat=0,qty=1;
 s.q.forEach(function(q){
  if(q.qtd){qty=st.qty;return}
  var o=q.o[st.ans[q.id]];if(!o)return;
  if(q.base)unit+=o.v+(o.per?o.per*st.sub:0);else{add+=o.add||0;mult*=o.mult||1;flat+=o.flat||0}
 });
 var disc=1;for(var i=0;i<C.desconto.length;i++){if(qty>=C.desconto[i].de){disc=C.desconto[i].m;break}}
 var sub=(unit*mult+add)*qty*disc+flat,d=days(),u=C.urgencia.filter(function(x){return d<=x.ate})[0];
 var total=Math.max(sub*u.m,C.minimo);
 return{lo:Math.floor(total*C.faixa[0]/10)*10,hi:Math.ceil(total*C.faixa[1]/10)*10,urg:u,d:d,qty:qty}
}
function fmtDate(){if(st.nodate||!st.date)return "Ainda sem data definida";var p=st.date.split("-");return p[2]+"/"+p[1]+"/"+p[0]}
function rows(){
 var s=svc(),r=[["Serviço",s.nome]];
 s.q.forEach(function(q){r.push([q.t.replace(/\?$/,""),q.qtd?String(st.qty):q.o[st.ans[q.id]].l]);if(q.base){var b=q.o[st.ans[q.id]];if(b.per)r.push([b.sl.replace(/\?$/,""),String(st.sub)])}});
 r.push(["Prazo",fmtDate()]);return r
}
function head(n,t){var b="";for(var i=1;i<=4;i++)b+='<i class="'+(i<=n?"on":"")+'"></i>';return '<div class="cbar">'+b+'</div><p class="cst">Etapa '+n+' de 4 · '+t+'</p>'}
function draw(){
 var h="";
 if(st.step===1){
  h=head(1,"O que você precisa?")+'<div class="svcs">'+C.servicos.map(function(s){return '<button type="button" class="svc" data-a="svc" data-v="'+s.id+'"><b>'+E(s.nome)+'</b><span>'+E(s.desc)+'</span></button>'}).join("")+'</div>';
 }else if(st.step===2){
  var s=svc();h=head(2,s.nome)+'<div class="qg">';
  s.q.forEach(function(q){
   h+='<fieldset class="q"><legend>'+E(q.t)+(q.dica?'<small>'+E(q.dica)+'</small>':"")+'</legend>';
   if(q.qtd)h+='<div class="qty"><button type="button" data-a="qm" aria-label="Diminuir">&minus;</button><output>'+st.qty+'</output><button type="button" data-a="qp" aria-label="Aumentar">+</button></div>';
   else h+='<div class="opts">'+q.o.map(function(o,i){return '<button type="button" class="opt'+(st.ans[q.id]===i?" sel":"")+'" data-a="opt" data-q="'+q.id+'" data-v="'+i+'">'+E(o.l)+'</button>'}).join("")+'</div>';
   h+='</fieldset>';
   if(q.base){var b=q.o[st.ans[q.id]];if(b.per)h+='<fieldset class="q"><legend>'+E(b.sl)+'</legend><div class="qty"><button type="button" data-a="sm" aria-label="Diminuir">&minus;</button><output>'+st.sub+'</output><button type="button" data-a="sp" aria-label="Aumentar">+</button></div></fieldset>'}
  });
  h+='</div><div class="cnav"><button type="button" class="btn alt" data-a="back">Voltar</button><button type="button" class="btn" data-a="next">Continuar</button></div>';
 }else if(st.step===3){
  h=head(3,"Prazo")+'<div class="qg"><fieldset class="q"><legend>Para quando você precisa?</legend><input type="date" id="cdate" min="'+iso(today())+'" value="'+st.date+'"'+(st.nodate?" disabled":"")+'><label class="chk"><input type="checkbox" id="cnod"'+(st.nodate?" checked":"")+'> Ainda não sei a data</label></fieldset>'
   +'<fieldset class="q"><legend>Quer contar mais sobre o projeto? <small>Opcional</small></legend><textarea id="cobs" placeholder="Referências, empresa, objetivo do projeto...">'+E(st.obs)+'</textarea></fieldset></div>'
   +'<div class="cnav"><button type="button" class="btn alt" data-a="back">Voltar</button><button type="button" class="btn" data-a="next" id="cgo"'+(!st.nodate&&!st.date?" disabled":"")+'>Ver estimativa</button></div>';
 }else{
  var r=calc(),msg="Olá Rafael, fiz uma simulação no seu portfólio.\n\n"+rows().map(function(x){return x[0]+": "+x[1]}).join("\n")+"\n\nEstimativa: "+brl(r.lo)+" a "+brl(r.hi)+(st.obs?"\n\nSobre o projeto: "+st.obs:"")+"\n\nPodemos conversar?";
  var nt="Estimativa baseada nas respostas acima. O valor final é confirmado após o briefing.";
  if(r.d<=19)nt="<b style='display:inline;font-size:inherit;font-weight:800;letter-spacing:0;margin:0'>"+r.urg.l+":</b> a estimativa já considera um acréscimo pela urgência. "+nt;
  if(st.svc==="producao"&&st.ans.niv===1)nt+=" No nível estratégico, o valor parte desta faixa e varia conforme a complexidade.";
  h=head(4,"Sua estimativa")+'<div class="rg"><div class="res"><small>Investimento estimado</small><b>'+brl(r.lo)+' a '+brl(r.hi)+'</b><p class="nt">'+nt+'</p></div>'
   +'<ul class="sum">'+rows().map(function(x){return '<li><span>'+E(x[0])+'</span><span>'+E(x[1])+'</span></li>'}).join("")+'</ul></div>'
   +'<div class="rcta"><a class="btn wabtn" target="_blank" rel="noopener" href="https://wa.me/5511979912151?text='+encodeURIComponent(msg)+'">Enviar pelo WhatsApp</a><a class="btn" href="mailto:rafael.dvs.01@gmail.com?subject='+encodeURIComponent("Orçamento: "+svc().nome)+'&body='+encodeURIComponent(msg)+'">Enviar por e-mail</a><button type="button" class="btn alt" data-a="redo">Refazer</button></div>';
 }
 root.innerHTML=h;
}
function setSvc(id){st.svc=id;st.ans={};st.qty=1;svc().q.forEach(function(q){if(!q.qtd)st.ans[q.id]=0});var b=bo();st.sub=b&&b.per?b.sd:1;st.step=2}
root.addEventListener("click",function(e){
 var t=e.target.closest("[data-a]");if(!t)return;var a=t.dataset.a,top=root.getBoundingClientRect().top<0;
 if(a==="svc")setSvc(t.dataset.v);
 else if(a==="opt"){st.ans[t.dataset.q]=+t.dataset.v;if(bq().id===t.dataset.q){var b=bo();st.sub=b.per?b.sd:1}}
 else if(a==="sm")st.sub=Math.max(1,st.sub-1);
 else if(a==="sp")st.sub=Math.min(bo().sm,st.sub+1);
 else if(a==="qm")st.qty=Math.max(1,st.qty-1);
 else if(a==="qp")st.qty=Math.min(qq().max,st.qty+1);
 else if(a==="next")st.step++;
 else if(a==="back")st.step--;
 else if(a==="redo"){st.step=1;st.svc=null}
 draw();if(top&&(a==="svc"||a==="next"||a==="back"||a==="redo"))root.scrollIntoView({behavior:"smooth",block:"start"});
});
root.addEventListener("input",function(e){
 var t=e.target;
 if(t.id==="cdate"){st.date=t.value}
 else if(t.id==="cnod"){st.nodate=t.checked;var d=document.getElementById("cdate");d.disabled=t.checked}
 else if(t.id==="cobs"){st.obs=t.value}
 var g=document.getElementById("cgo");if(g)g.disabled=!st.nodate&&!st.date;
});
draw();
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
 if(n>=0){var s=links[n].parentNode;if(s.scrollWidth>s.clientWidth)s.scrollTo({left:links[n].offsetLeft-(s.clientWidth-links[n].offsetWidth)/2,behavior:"smooth"})}
}
window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});
window.addEventListener("resize",upd);upd();
})();
