
(function(){
  var drive=document.querySelector('.drive'); if(!drive) return;
  var stage=drive.querySelector('.stage'), hdr=document.querySelector('header');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var carBox=stage.querySelector('.car'), bodyG=document.getElementById('gyBody'), driverG=document.getElementById('gyDriver'), camG=document.getElementById('gyCam');
  var dust=document.getElementById('gyDust'), mand=stage.querySelector('.mandala svg');
  var wheels=[document.getElementById('gyWR'),document.getElementById('gyWF')];
  var blurs=stage.querySelectorAll('.wb'), details=stage.querySelectorAll('.wd');
  var layers=[].map.call(stage.querySelectorAll('.lay'),function(el){return{el:el,f:parseFloat(el.getAttribute('data-f')),tile:1}});
  var W=1,carW=1,rWheel=50,range=1,top0=0,IDLE=reduce?0:130,K=4.5;
  var t=0,sm=0,D=0,prevD=0,v=0,last=0,raf=0;
  function clamp(x,a,b){return x<a?a:x>b?b:x}

  function measure(){
    var hh=hdr?hdr.offsetHeight:67;
    document.documentElement.style.setProperty('--hh',hh+'px');
    W=stage.clientWidth;
    carW=carBox.getBoundingClientRect().width;
    rWheel=56*carW/648;
    layers.forEach(function(L){
      var tpl=L.el.firstElementChild;
      L.tile=tpl.getBoundingClientRect().width||1;
      var need=Math.ceil(W/L.tile)+2;
      while(L.el.children.length<need){L.el.appendChild(tpl.cloneNode(true))}
      while(L.el.children.length>need){L.el.removeChild(L.el.lastChild)}
    });
    top0=drive.getBoundingClientRect().top+window.pageYOffset-hh;
    range=Math.max(1,drive.offsetHeight-stage.offsetHeight);
  }

  function render(p){
    layers.forEach(function(L){
      var off=(D*L.f)%L.tile;
      L.el.style.transform='translate3d('+(-off).toFixed(1)+'px,0,0)';
    });
    var e=p*p*(3-2*p), left=clamp(W*(.17+.15*e),6,Math.max(6,W-carW-6));
    carBox.style.transform='translate3d('+left.toFixed(1)+'px,0,0)';
    var a=(D/rWheel*57.29578)%360;
    wheels.forEach(function(w){w.setAttribute('transform','rotate('+a.toFixed(2)+')')});
    var bl=clamp((v-650)/1500,0,.78);
    for(var i=0;i<blurs.length;i++){blurs[i].style.opacity=bl.toFixed(2);details[i].style.opacity=(1-bl*.75).toFixed(2)}
    var amp=clamp(v/1200,0,1);
    var bob=Math.sin(t*9)*(.5+amp*2.3)+Math.sin(t*5.3+1)*(.3+amp*1.2);
    var pitch=Math.sin(t*6.2+.7)*(.12+amp*.7);
    bodyG.setAttribute('transform','translate(0 '+bob.toFixed(2)+') rotate('+pitch.toFixed(2)+' 372 262)');
    driverG.setAttribute('transform','translate(0 '+(-bob*.35).toFixed(2)+')');
    camG.setAttribute('transform','translate(0 '+(-bob*.2+Math.sin(t*3.1)*.5).toFixed(2)+')');
    dust.setAttribute('opacity',clamp((v-140)/800,0,.9).toFixed(2));
    mand.style.transform='rotate('+(D*.012).toFixed(2)+'deg)';
  }

  function frame(now){
    raf=requestAnimationFrame(frame);
    var dt=Math.min(.05,((now-last)/1000)||.016); last=now; t+=dt;
    var s=clamp(window.pageYOffset-top0,0,range);
    sm+=(s-sm)*(1-Math.exp(-dt*8));
    D=sm*K+t*IDLE;
    v+=(((D-prevD)/dt)-v)*(1-Math.exp(-dt*6)); prevD=D;
    render(sm/range);
  }
  function start(){if(!raf&&!reduce){last=performance.now();raf=requestAnimationFrame(frame)}}
  function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}

  measure(); render(0);
  window.addEventListener('resize',function(){measure();render(clamp(sm/range,0,1))},{passive:true});
  window.addEventListener('load',function(){measure();render(clamp(sm/range,0,1))});
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){measure()})}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es[0].isIntersecting?start():stop()}).observe(drive);
  }else{start()}

  /* booking bar -> WhatsApp message */
  var guests=0, gl=document.getElementById('gl'), gm=document.getElementById('gm'), gp=document.getElementById('gp');
  var dt_=document.getElementById('dt'), dl=document.getElementById('dl'), go=document.getElementById('go');
  var gw=document.getElementById('gwrap'), dw=document.getElementById('dwrap');
  function fmt(v){var d=new Date(v+'T00:00:00');return isNaN(d)?v:d.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}
  function sync(){
    gl.textContent=guests?guests+(guests>1?' guests':' guest'):'Guests';
    gw.classList.toggle('has',guests>0);
    gm.disabled=guests<1; gp.disabled=guests>=12;
    dl.textContent=dt_.value?fmt(dt_.value):'Preferred date';
    dw.classList.toggle('has',!!dt_.value);
    var m="Hi Ashwin, I'd like to plan a wildlife journey";
    if(guests)m+=' for '+guests+(guests>1?' guests':' guest');
    if(dt_.value)m+=' around '+fmt(dt_.value);
    go.href='https://wa.me/917610955302?text='+encodeURIComponent(m+'.');
  }
  try{dt_.min=new Date().toISOString().slice(0,10)}catch(e){}
  gm.addEventListener('click',function(){if(guests>0){guests--;sync()}});
  gp.addEventListener('click',function(){if(guests<12){guests++;sync()}});
  dt_.addEventListener('change',sync);
  dt_.addEventListener('click',function(){try{dt_.showPicker&&dt_.showPicker()}catch(e){}});
  sync();
})();
