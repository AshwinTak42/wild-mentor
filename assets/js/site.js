
document.getElementById('year').textContent=new Date().getFullYear();
var els=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('on')})}


(function(){
  var bar=document.getElementById('trail'),drive=document.querySelector('.drive');if(!bar)return;
  var hill=bar.querySelector('.hill'),sv=bar.querySelector('svg.h'),fl=sv.querySelector('.fl'),ln=sv.querySelector('.ln'),car=bar.querySelector('.mini');
  var mw=[].slice.call(bar.querySelectorAll('.mw')),cx=[24,72],H=26,W=0,cw=68,tick=0;
  function sy(x){return H-(7+4.5*Math.sin(x/W*14.4+.6)+2.5*Math.sin(x/W*32))}
  function build(){W=hill.clientWidth||innerWidth;sv.setAttribute('viewBox','0 0 '+W+' '+H);var d='';for(var x=0;x<=W+8;x+=8){var X=Math.min(x,W);d+=(x?'L':'M')+X.toFixed(1)+','+sy(X).toFixed(1)}ln.setAttribute('d',d);fl.setAttribute('d',d+'L'+W+','+(H+4)+'L0,'+(H+4)+'Z');cw=car.getBoundingClientRect().width||68;upd()}
  function upd(){tick=0;
    var r=drive?drive.getBoundingClientRect().bottom:0;bar.classList.toggle('on',r<160);
    var max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,Math.max(0,pageYOffset/max)):0;
    var x=p*(W-cw),y=sy(x+cw/2),a=Math.atan2(sy(x+cw*.8)-sy(x+cw*.2),cw*.6)*57.3;
    car.style.transform='translate('+x.toFixed(1)+'px,'+(y-cw*.4688).toFixed(1)+'px) rotate('+a.toFixed(1)+'deg)';
    var rot=(x/(9*cw/96)*57.3)%360;mw.forEach(function(g,i){g.setAttribute('transform','translate('+cx[i]+' 36) rotate('+rot.toFixed(1)+')')})}
  function q(){if(!tick)tick=requestAnimationFrame(upd)}
  addEventListener('scroll',q,{passive:true});addEventListener('resize',build);addEventListener('load',build);build();
})();

(function(){var s=document.getElementById('gscroll');if(!s)return;var items=[].slice.call(s.children);
function L(f){return f.getBoundingClientRect().left-s.getBoundingClientRect().left+s.scrollLeft}
[].forEach.call(document.querySelectorAll('.gnav'),function(b){b.addEventListener('click',function(){
var cur=s.scrollLeft,p=parseFloat(getComputedStyle(s).paddingLeft)||0,t=null,i;
if(b.classList.contains('next')){for(i=0;i<items.length;i++){if(L(items[i])-p>cur+8){t=items[i];break}}
if(!t||cur+s.clientWidth>=s.scrollWidth-4){s.scrollTo({left:0,behavior:'smooth'});return}}
else{for(i=items.length-1;i>=0;i--){if(L(items[i])-p<cur-8){t=items[i];break}}
if(!t){s.scrollTo({left:s.scrollWidth,behavior:'smooth'});return}}
s.scrollTo({left:L(t)-p,behavior:'smooth'})})})})();
(function(){var box,img,cap,list=[],idx=0,x0=0;
function build(){box=document.createElement('div');box.className='lb';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');
box.innerHTML='<button class="lb-x" aria-label="Close">\u00d7</button><button class="lb-n lb-p" aria-label="Previous photo">\u2039</button><button class="lb-n lb-nx" aria-label="Next photo">\u203a</button><figure><img alt=""><figcaption></figcaption></figure>';
document.body.appendChild(box);img=box.querySelector('img');cap=box.querySelector('figcaption');
box.addEventListener('click',function(e){if(e.target===box||e.target.closest('.lb-x'))close();else if(e.target.closest('.lb-p'))go(-1);else if(e.target.closest('.lb-nx'))go(1)});
box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
box.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(d<0?1:-1)})}
function show(){var el=list[idx],f=el.closest('figure'),c=f&&f.querySelector('figcaption');img.src=el.getAttribute('data-full')||el.currentSrc||el.src;img.alt=el.alt;cap.textContent=c?c.textContent:el.alt;box.classList.toggle('single',list.length<2)}
function open(el){if(!box)build();var c=el.closest('.gal,.gscroll');list=[].slice.call(c.querySelectorAll('img'));idx=list.indexOf(el);show();box.classList.add('on');document.documentElement.style.overflow='hidden';box.querySelector('.lb-x').focus()}
function close(){box.classList.remove('on');document.documentElement.style.overflow='';img.removeAttribute('src')}
function go(d){idx=(idx+d+list.length)%list.length;show()}
document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('.gal img,.gscroll img');if(el)open(el)});
document.addEventListener('keydown',function(e){if(box&&box.classList.contains('on')){if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1)}else if(e.key==='Enter'&&e.target.matches&&e.target.matches('.gal img,.gscroll img'))open(e.target)});
[].forEach.call(document.querySelectorAll('.gal img,.gscroll img'),function(i){i.tabIndex=0;i.setAttribute('role','button')})})();

(function(){function play(b){if(!b||!b.getAttribute('data-yt'))return;var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.getAttribute('data-yt')+'?autoplay=1&rel=0&playsinline=1';f.title=b.getAttribute('data-title')||'Video';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.setAttribute('allowfullscreen','');f.referrerPolicy='strict-origin-when-cross-origin';b.replaceChildren(f);b.classList.add('playing');b.removeAttribute('data-yt');b.removeAttribute('role');b.removeAttribute('tabindex')}
document.addEventListener('click',function(e){play(e.target.closest&&e.target.closest('.vid[data-yt]'))});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('.vid[data-yt]')){e.preventDefault();play(e.target)}})})();

(function(){var h=document.querySelector('header');if(!h)return;var t=0;function f(){t=0;h.classList.toggle('scrolled',(window.pageYOffset||0)>16)}addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(f)},{passive:true});f()})();
