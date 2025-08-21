// Enhance code blocks: add copy button using <clipboard-copy>
(function(){
  function enhance(){
    document.querySelectorAll('pre > code').forEach(code => {
      const pre = code.parentElement;
      if (pre && !pre.classList.contains('has-copy')){
        pre.classList.add('has-copy');
        const wrap = document.createElement('div');
        wrap.style.position = 'relative';
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);

        const btn = document.createElement('clipboard-copy');
        btn.setAttribute('value', code.textContent || '');
        btn.setAttribute('aria-label', 'Copy code');
        btn.className = 'copy-btn';
        btn.innerHTML = '<span class="octicon octicon-copy"></span>';
        wrap.appendChild(btn);

        btn.addEventListener('click', () => {
          btn.innerHTML = '<span class="octicon octicon-check"></span>';
          setTimeout(()=> btn.innerHTML = '<span class="octicon octicon-copy"></span>', 1200);
        });
      }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();


