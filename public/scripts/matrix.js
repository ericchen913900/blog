// Particle constellation background - theme-aware, lightweight, and respects reduced motion
(function(){
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, DPR = Math.min(2, window.devicePixelRatio || 1);
  let particles = [];
  let lineDist = 0;
  let pointer = { x: -9999, y: -9999 };
  let running = true;

  function hexToRgba(hex, a){
    hex = hex.trim();
    if (/^rgb\(/i.test(hex)) return hex.replace(/rgb\(([^)]+)\)/, `rgba($1, ${a})`);
    const m = hex.replace('#','');
    if (m.length === 3){
      const r=parseInt(m[0]+m[0],16), g=parseInt(m[1]+m[1],16), b=parseInt(m[2]+m[2],16);
      return `rgba(${r},${g},${b},${a})`;
    }
    const r=parseInt(m.slice(0,2),16), g=parseInt(m.slice(2,4),16), b=parseInt(m.slice(4,6),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function theme(){
    const styles = getComputedStyle(document.documentElement);
    const primary = (styles.getPropertyValue('--primary') || '#10d7b2').trim();
    const accent = (styles.getPropertyValue('--accent') || primary).trim();
    return { primary, accent };
  }

  function makeParticles(){
    const count = Math.min(160, Math.floor((width * height) / 12000));
    particles = new Array(count).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random()*2 - 1) * 0.35,
      vy: (Math.random()*2 - 1) * 0.35,
      r: 1 + Math.random()*1.2
    }));
    lineDist = Math.max(80, Math.min(140, Math.sqrt(width*height) / 12));
  }

  function resize(){
    DPR = Math.min(2, window.devicePixelRatio || 1);
    width = canvas.width = Math.floor(innerWidth * DPR);
    height = canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    makeParticles();
  }

  function step(){
    if (!running) return;
    const { primary, accent } = theme();
    ctx.clearRect(0, 0, width, height);

    // Draw connections first for better layering
    const lineColor = hexToRgba(primary, 0.18);
    const lineColorStrong = hexToRgba(accent, 0.28);
    for (let i=0;i<particles.length;i++){
      const p = particles[i];
      // integrate motion
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

      // pointer slight attraction
      const dxp = p.x - pointer.x, dyp = p.y - pointer.y;
      const dp2 = dxp*dxp + dyp*dyp;
      if (dp2 < (lineDist*lineDist)){
        ctx.strokeStyle = lineColorStrong;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < lineDist*lineDist){
          const t = 1 - d2/(lineDist*lineDist);
          ctx.strokeStyle = lineColor;
          ctx.globalAlpha = 0.2 + 0.4*t;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Draw particles on top
    ctx.fillStyle = hexToRgba(primary, 0.9);
    for (const p of particles){
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  function onMove(e){
    if (e.touches && e.touches[0]) {
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
    } else {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
  }

  window.addEventListener('resize', resize, { passive:true });
  window.addEventListener('mousemove', onMove, { passive:true });
  window.addEventListener('touchmove', onMove, { passive:true });
  document.addEventListener('mouseleave', ()=>{ pointer.x = -9999; pointer.y = -9999; });

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(step);
  });

  resize();
  requestAnimationFrame(step);
})();
