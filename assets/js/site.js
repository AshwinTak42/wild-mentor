
document.getElementById('year').textContent=new Date().getFullYear();
var els=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('on')})}


(function(){
  var bar=document.getElementById('trail'),drive=document.querySelector('.drive');if(!bar)return;
  var hill=bar.querySelector('.hill'),sv=bar.querySelector('svg.h'),fl=sv.querySelector('.fl'),ln=sv.querySelector('.ln'),car=bar.querySelector('.mini');
  var mw=[].slice.call(bar.querySelectorAll('.mw')),cx=[24,72],H=34,W=0,cw=68,tick=0;
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

(function(){var s=document.getElementById('gscroll');if(!s)return;[].forEach.call(document.querySelectorAll('.gnav'),function(b){b.addEventListener('click',function(){s.scrollBy({left:(b.classList.contains('next')?1:-1)*s.clientWidth*.8,behavior:'smooth'})})})})();
