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
document.querySelectorAll(".sr-next-h").forEach(function(e){e.textContent="Calendario completato";});
document.querySelectorAll(".sr-next-info").forEach(function(e){e.hidden=true;});
document.querySelectorAll(".sr-next-line").forEach(function(e){e.textContent="Tutti i risultati nella pagina Partite";});return;}
next.classList.add("sr-is-next");
var w=next.querySelector(".sr-mwhen"),t=document.createElement("span");t.className="sr-tag";t.textContent="Prossima";w.appendChild(t);
var g=next.getAttribute("data-g"),h=next.getAttribute("data-home"),a=next.getAttribute("data-away"),d=next.getAttribute("data-day"),o=next.getAttribute("data-time");
document.querySelectorAll(".sr-next-k").forEach(function(e){e.textContent="Prossima partita · Giornata "+g;});
document.querySelectorAll(".sr-next-h").forEach(function(e){e.textContent="";e.appendChild(document.createTextNode(h+" "));var v=document.createElement("span");v.className="sr-vs";v.textContent="vs";e.appendChild(v);e.appendChild(document.createTextNode(" "+a));});
document.querySelectorAll(".sr-next-d").forEach(function(e){e.textContent=d;});
document.querySelectorAll(".sr-next-t").forEach(function(e){e.textContent=o;});
document.querySelectorAll(".sr-next-line").forEach(function(e){e.textContent=d+" · ore "+o+" · Club Le Palme";});
})();
