(function(){
var pages=["home","rosa","partite","rione","sponsor","privacy"];
function show(id,scroll){
if(pages.indexOf(id)<0)id="home";
document.querySelectorAll("[data-page]").forEach(function(p){p.hidden=p.getAttribute("data-page")!==id;});
document.querySelectorAll(".sr-tab").forEach(function(t){t.setAttribute("aria-current",t.getAttribute("data-go")===id?"page":"false");});
if(scroll)window.scrollTo(0,0);
}
var root=document.querySelector(".sr-root"),burger=document.querySelector(".sr-burger"),closer=document.querySelector(".sr-close");
function menu(open,focus){
root.classList.toggle("sr-open",open);
burger.setAttribute("aria-expanded",open?"true":"false");
document.body.style.overflow=open?"hidden":"";
if(focus)(open?closer:burger).focus();
}
burger.addEventListener("click",function(){menu(true,true);});
closer.addEventListener("click",function(){menu(false,true);});
document.querySelector(".sr-shade").addEventListener("click",function(){menu(false,false);});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&root.classList.contains("sr-open"))menu(false,true);});
window.addEventListener("resize",function(){if(window.innerWidth>=900&&root.classList.contains("sr-open"))menu(false,false);});
document.addEventListener("click",function(e){
var b=e.target.closest("[data-go]");if(!b)return;
menu(false,false);
if(b.tagName==="A")e.preventDefault();
var id=b.getAttribute("data-go");
if(location.hash.slice(1)!==id)history.pushState(null,"",id==="home"?location.pathname:"#"+id);
show(id,true);
});
window.addEventListener("popstate",function(){show(location.hash.slice(1)||"home",true);});
show(location.hash.slice(1)||"home",false);
})();
(function(){
var ms=[].slice.call(document.querySelectorAll(".sr-match"));if(!ms.length)return;
var now=Date.now(),next=null;
for(var i=0;i<ms.length;i++){if(Date.parse(ms[i].getAttribute("data-when"))+60*60*1000>now){next=ms[i];break;}}
if(!next){document.querySelectorAll(".sr-next-k").forEach(function(e){e.textContent="Frascati Cup";});
document.querySelectorAll(".sr-next-h").forEach(function(e){e.textContent="Girone completato";});
document.querySelectorAll(".sr-next-info").forEach(function(e){e.hidden=true;});
document.querySelectorAll(".sr-next-line").forEach(function(e){e.textContent="Ora la fase finale: date nella pagina Partite";});return;}
next.classList.add("sr-is-next");
var w=next.querySelector(".sr-mwhen"),t=document.createElement("span");t.className="sr-tag";t.textContent="Prossima";w.appendChild(t);
var g=next.getAttribute("data-g"),h=next.getAttribute("data-home"),a=next.getAttribute("data-away"),d=next.getAttribute("data-day"),o=next.getAttribute("data-time");
document.querySelectorAll(".sr-next-k").forEach(function(e){e.textContent="Prossima partita · Giornata "+g;});
document.querySelectorAll(".sr-next-h").forEach(function(e){e.textContent="";e.appendChild(document.createTextNode(h+" "));var v=document.createElement("span");v.className="sr-vs";v.textContent="vs";e.appendChild(v);e.appendChild(document.createTextNode(" "+a));});
document.querySelectorAll(".sr-next-d").forEach(function(e){e.textContent=d;});
document.querySelectorAll(".sr-next-t").forEach(function(e){e.textContent=o;});
document.querySelectorAll(".sr-next-line").forEach(function(e){e.textContent=d+" · ore "+o+" · Club Le Palme";});
})();
(function(){
var ms=[].slice.call(document.querySelectorAll(".sr-match[data-result]")),boxes=[].slice.call(document.querySelectorAll(".sr-last"));
if(!boxes.length)return;
if(!ms.length){boxes.forEach(function(b){b.hidden=true;});return;}
var m=ms[ms.length-1],r=m.getAttribute("data-result").split("-"),hg=parseInt(r[0],10),ag=parseInt(r[1],10);
var h=m.getAttribute("data-home"),a=m.getAttribute("data-away"),us="Piazza San Rocco";
var mine=h===us?hg:ag,theirs=h===us?ag:hg;
var res=mine>theirs?["Vittoria","w"]:mine<theirs?["Sconfitta","l"]:["Pareggio","d"];
var sc=m.getAttribute("data-scorers")||"";
function team(el,name){el.textContent="";if(name===us){var s=document.createElement("span");s.className="sr-us";s.textContent=name;el.appendChild(s);}else{el.textContent=name;}}
boxes.forEach(function(b){
b.querySelector(".sr-last-k").textContent="Ultima partita · Giornata "+m.getAttribute("data-g");
var t=b.querySelector(".sr-last-res");t.textContent=res[0];t.className="sr-res sr-res--"+res[1]+" sr-last-res";
team(b.querySelector(".sr-last-home"),h);team(b.querySelector(".sr-last-away"),a);
var n=b.querySelector(".sr-last-num");n.textContent=hg+" \u2013 "+ag;n.setAttribute("aria-label",hg+" a "+ag);
b.querySelector(".sr-last-meta").textContent=m.getAttribute("data-day")+" · Club Le Palme";
var p=b.querySelector(".sr-last-scorers");if(sc){p.textContent="Marcatori: "+sc;p.hidden=false;}else{p.hidden=true;}
});
})();
(function(){
var box=document.querySelector(".sr-stats");if(!box)return;
var us="Piazza San Rocco",ms=[].slice.call(document.querySelectorAll(".sr-match[data-result]"));
var st={giocate:0,vinte:0,pari:0,perse:0,gf:0,gs:0,punti:0},goals={};
ms.forEach(function(m){
var r=m.getAttribute("data-result").split("-"),h=parseInt(r[0],10),a=parseInt(r[1],10),home=m.getAttribute("data-home")===us;
var f=home?h:a,s=home?a:h;st.giocate++;st.gf+=f;st.gs+=s;
if(f>s){st.vinte++;st.punti+=3;}else if(f===s){st.pari++;st.punti+=1;}else{st.perse++;}
(m.getAttribute("data-scorers")||"").split(/,\s*(?![^()]*\))/).forEach(function(x){
x=x.trim();if(!x)return;var p=x.match(/^(.+?)(?:\s+(\d+))?\s*(?:\(.*\))?$/);if(!p)return;
var k=p[1].trim();goals[k]=(goals[k]||0)+(p[2]?parseInt(p[2],10):1);});
});
Object.keys(st).forEach(function(k){var e=box.querySelector('[data-stat="'+k+'"]');if(e)e.textContent=st[k];});
var roster=[].slice.call(document.querySelectorAll(".roster .pl")).map(function(p){return{n:p.querySelector(".pl-n").textContent,f:p.querySelector(".pl-f").textContent,l:p.querySelector(".pl-l").textContent};});
function find(k){var m=k.match(/^([A-Z])\.\s+(.+)$/),last=m?m[2]:k,ini=m?m[1]:null;
var c=roster.filter(function(r){return r.l===last&&(!ini||r.f.charAt(0)===ini);});return c.length===1?c[0]:{n:"",f:"",l:k};}
var list=box.querySelector(".sr-scorer-list"),rows=Object.keys(goals).map(function(k){var p=find(k);p.g=goals[k];return p;});
rows.sort(function(a,b){return b.g-a.g||a.l.localeCompare(b.l,"it");});
list.textContent="";
rows.forEach(function(r){var li=document.createElement("li");li.className="sc";
var n=document.createElement("span");n.className="sc-n";n.textContent=r.n;
var nm=document.createElement("span");nm.className="sc-name";var a=document.createElement("span");a.className="pl-f";a.textContent=r.f;var b=document.createElement("span");b.className="pl-l";b.textContent=r.l;nm.appendChild(a);nm.appendChild(b);
var g=document.createElement("span");g.className="sc-g";g.textContent=r.g;g.setAttribute("aria-label",r.g+" gol");
li.appendChild(n);li.appendChild(nm);li.appendChild(g);list.appendChild(li);});
box.hidden=false;
})();
