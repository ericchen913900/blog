// Reveal on scroll with IntersectionObserver
// Adds class 'in' to elements with class 'reveal' when in viewport.
// Respects reduced motion preference.
(function(){
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  function applyStagger(container){
    const children = container.querySelectorAll(':scope > *');
    children.forEach((el, idx) => {
      el.style.setProperty('--delay', `${idx * 60}ms`);
      el.classList.add('reveal');
    });
  }

  const observer = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        const el = e.target;
        if (el.classList.contains('reveal-stagger')) applyStagger(el);
        el.classList.add('in');
        observer.unobserve(el);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  function init(){
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


