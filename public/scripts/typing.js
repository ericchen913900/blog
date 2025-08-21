// Simple typewriter: reads data-text from element with class 'type-target'
(function(){
  function type(el, text, speed=70){
    el.classList.remove('caret');
    el.textContent = '';
    let i = 0;
    const tid = setInterval(()=>{
      el.textContent += text.charAt(i);
      i++;
      if(i>=text.length){
        clearInterval(tid);
        el.classList.add('caret');
      }
    }, speed);
  }

  function init(){
    const el = document.querySelector('.type-target');
    if(!el) return;
    const text = el.dataset.text || el.getAttribute('data-text') || el.textContent || '';
    // small delay so it feels natural
    setTimeout(()=> type(el, text, 70), 420);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else init();
})();
