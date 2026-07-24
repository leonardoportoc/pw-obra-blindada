/* PW — interações leves compartilhadas */
(function(){
  // menu mobile
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav){
    burger.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){ if(e.target.tagName==='A') nav.classList.remove('open'); });
  }
  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.08});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }
})();
