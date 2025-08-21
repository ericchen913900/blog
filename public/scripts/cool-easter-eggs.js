// 酷炫彩蛋功能集合
class CoolEasterEggs {
  constructor() {
    this.konami = [];
    this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    this.matrixActive = false;
    this.init();
  }

  init() {
    // Konami Code 監聽
    document.addEventListener('keydown', (e) => this.handleKonami(e));
    
    // 其他按鍵彩蛋
    document.addEventListener('keydown', (e) => {
      switch(e.key.toLowerCase()) {
        case 'h': // Hacker mode
          if (e.ctrlKey) this.toggleHackerMode();
          break;
        case 'm': // Matrix rain
          if (!this.matrixActive) this.startMatrixRain();
          break;
        case 'c': // Console message
          this.showConsoleArt();
          break;
        case 'g': // Glitch effect
          this.triggerGlitchEffect();
          break;
        case 'n': // Neon glow
          this.toggleNeonMode();
          break;
      }
    });

    // 滑鼠彩蛋
    this.setupMouseEasterEggs();
    
    // 時間彩蛋
    this.setupTimeEasterEggs();
  }

  // Konami Code 彩蛋
  handleKonami(e) {
    this.konami.push(e.keyCode);
    if (this.konami.length > this.konamiCode.length) {
      this.konami.shift();
    }
    
    if (this.konami.join(',') === this.konamiCode.join(',')) {
      this.triggerKonamiEasterEgg();
      this.konami = [];
    }
  }  
triggerKonamiEasterEgg() {
    // 創建彩虹爆炸效果
    const colors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff'];
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const firework = document.createElement('div');
        firework.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          z-index: 10000;
          animation: fireworkExplode 2s ease-out forwards;
          box-shadow: 0 0 20px currentColor;
        `;
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
          if (firework.parentNode) firework.parentNode.removeChild(firework);
        }, 2000);
      }, i * 100);
    }
    
    this.showMessage('🎉 Konami Code 啟動！你找到了隱藏的彩蛋！', 'rainbow');
  }

  // Matrix 雨效果
  startMatrixRain() {
    if (this.matrixActive) return;
    this.matrixActive = true;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9998;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff88';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 50);
    
    setTimeout(() => {
      clearInterval(interval);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      this.matrixActive = false;
    }, 5000);
    
    this.showMessage('🔰 進入 Matrix 模式...', 'matrix');
  }  // Hacker 
模式
  toggleHackerMode() {
    const body = document.body;
    if (body.classList.contains('hacker-mode')) {
      body.classList.remove('hacker-mode');
      this.showMessage('🔒 Hacker 模式關閉', 'normal');
    } else {
      body.classList.add('hacker-mode');
      this.showMessage('💀 Hacker 模式啟動！', 'hacker');
      this.addHackerStyles();
    }
  }

  addHackerStyles() {
    if (document.getElementById('hacker-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'hacker-styles';
    style.textContent = `
      .hacker-mode {
        background: #000 !important;
        color: #00ff00 !important;
        font-family: 'Courier New', monospace !important;
      }
      .hacker-mode * {
        color: #00ff00 !important;
        text-shadow: 0 0 5px #00ff00 !important;
      }
      .hacker-mode a:hover {
        color: #ff0000 !important;
        text-shadow: 0 0 10px #ff0000 !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 故障效果
  triggerGlitchEffect() {
    const elements = document.querySelectorAll('h1, h2, h3, .logo');
    
    elements.forEach(el => {
      const originalText = el.textContent;
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      let glitchCount = 0;
      const glitchInterval = setInterval(() => {
        if (glitchCount > 10) {
          el.textContent = originalText;
          clearInterval(glitchInterval);
          return;
        }
        
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.3) {
            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitchedText += originalText[i];
          }
        }
        
        el.textContent = glitchedText;
        glitchCount++;
      }, 100);
    });
    
    this.showMessage('⚡ 系統故障中...', 'glitch');
  }

  // 霓虹燈模式
  toggleNeonMode() {
    const body = document.body;
    if (body.classList.contains('neon-mode')) {
      body.classList.remove('neon-mode');
      this.showMessage('💡 霓虹燈模式關閉', 'normal');
    } else {
      body.classList.add('neon-mode');
      this.showMessage('🌈 霓虹燈模式啟動！', 'neon');
      this.addNeonStyles();
    }
  }

  addNeonStyles() {
    if (document.getElementById('neon-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'neon-styles';
    style.textContent = `
      .neon-mode {
        background: #0a0a0a !important;
      }
      .neon-mode h1, .neon-mode h2, .neon-mode h3 {
        color: #ff00ff !important;
        text-shadow: 
          0 0 5px #ff00ff,
          0 0 10px #ff00ff,
          0 0 15px #ff00ff,
          0 0 20px #ff00ff !important;
        animation: neonFlicker 2s infinite alternate;
      }
      .neon-mode .logo {
        color: #00ffff !important;
        text-shadow: 
          0 0 5px #00ffff,
          0 0 10px #00ffff,
          0 0 15px #00ffff !important;
      }
      @keyframes neonFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }  
// Console 藝術
  showConsoleArt() {
    console.clear();
    console.log(`
    ██╗   ██╗███████╗███████╗███████╗
    ╚██╗ ██╔╝██╔════╝██╔════╝██╔════╝
     ╚████╔╝ █████╗  █████╗  █████╗  
      ╚██╔╝  ██╔══╝  ██╔══╝  ██╔══╝  
       ██║   ███████╗███████╗███████╗
       ╚═╝   ╚══════╝╚══════╝╚══════╝
    
    🎯 CTF Player & Security Enthusiast
    🏎️ F1 Racing Fan
    💻 Code & Hack
    
    彩蛋指令：
    - Ctrl+H: Hacker 模式
    - M: Matrix 雨
    - G: 故障效果  
    - N: 霓虹燈模式
    - C: 顯示此藝術
    - Konami Code: ↑↑↓↓←→←→BA
    `);
    
    this.showMessage('🎨 Console 藝術已顯示！', 'console');
  }

  // 滑鼠彩蛋
  setupMouseEasterEggs() {
    let clickCount = 0;
    let clickTimer = null;
    
    document.addEventListener('click', (e) => {
      clickCount++;
      
      if (clickTimer) clearTimeout(clickTimer);
      
      clickTimer = setTimeout(() => {
        if (clickCount >= 10) {
          this.triggerClickBomb(e);
        }
        clickCount = 0;
      }, 2000);
    });

    // 滑鼠軌跡
    let isTrailActive = false;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'x' && !isTrailActive) {
        this.startMouseTrail();
        isTrailActive = true;
        setTimeout(() => { isTrailActive = false; }, 10000);
      }
    });
  }

  triggerClickBomb(e) {
    const colors = ['#ff4757', '#ff6b7a', '#ff8c94', '#ffa8a8'];
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        z-index: 10000;
        pointer-events: none;
        animation: clickBombExplode 1s ease-out forwards;
      `;
      
      const angle = (Math.PI * 2 * i) / 15;
      const distance = 100 + Math.random() * 50;
      
      particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 1000);
    }
    
    this.showMessage('💥 點擊炸彈！', 'bomb');
  }

  startMouseTrail() {
    const trail = [];
    const maxTrail = 20;
    
    const mouseMoveHandler = (e) => {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #00ff88;
        border-radius: 50%;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
        z-index: 9999;
        pointer-events: none;
        animation: trailFade 1s ease-out forwards;
        box-shadow: 0 0 10px #00ff88;
      `;
      
      document.body.appendChild(dot);
      trail.push(dot);
      
      if (trail.length > maxTrail) {
        const oldDot = trail.shift();
        if (oldDot.parentNode) oldDot.parentNode.removeChild(oldDot);
      }
      
      setTimeout(() => {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }, 1000);
    };
    
    document.addEventListener('mousemove', mouseMoveHandler);
    
    setTimeout(() => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      trail.forEach(dot => {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      });
    }, 10000);
    
    this.showMessage('✨ 滑鼠軌跡啟動！', 'trail');
  } 
 // 時間彩蛋
  setupTimeEasterEggs() {
    const now = new Date();
    const hour = now.getHours();
    
    // 深夜彩蛋 (23:00 - 05:00)
    if (hour >= 23 || hour <= 5) {
      setTimeout(() => {
        this.showMessage('🌙 深夜 Hacker 時間！按 Ctrl+H 進入 Hacker 模式', 'night');
      }, 3000);
    }
    
    // 生日彩蛋 (可以設定你的生日)
    const birthday = new Date(now.getFullYear(), 11, 25); // 12月25日
    if (now.toDateString() === birthday.toDateString()) {
      setTimeout(() => {
        this.triggerBirthdayEasterEgg();
      }, 2000);
    }
  }

  triggerBirthdayEasterEgg() {
    // 生日煙火效果
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#00bfff', '#98fb98'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const firework = document.createElement('div');
        firework.innerHTML = '🎉';
        firework.style.cssText = `
          position: fixed;
          font-size: 30px;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          z-index: 10000;
          animation: birthdayFloat 3s ease-out forwards;
          pointer-events: none;
        `;
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
          if (firework.parentNode) firework.parentNode.removeChild(firework);
        }, 3000);
      }, i * 50);
    }
    
    this.showMessage('🎂 生日快樂！', 'birthday');
  }

  // 通用訊息顯示
  showMessage(text, type = 'normal') {
    const message = document.createElement('div');
    message.textContent = text;
    
    const styles = {
      normal: 'background: linear-gradient(45deg, #667eea, #764ba2);',
      rainbow: 'background: linear-gradient(45deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff);',
      matrix: 'background: linear-gradient(45deg, #000, #003300); color: #00ff00; border: 1px solid #00ff00;',
      hacker: 'background: linear-gradient(45deg, #000, #001100); color: #00ff00; border: 1px solid #00ff00;',
      glitch: 'background: linear-gradient(45deg, #ff0000, #000); animation: glitchMessage 0.5s infinite;',
      neon: 'background: linear-gradient(45deg, #ff00ff, #00ffff); text-shadow: 0 0 10px currentColor;',
      console: 'background: linear-gradient(45deg, #2c3e50, #34495e);',
      bomb: 'background: linear-gradient(45deg, #ff4757, #ff6b7a);',
      trail: 'background: linear-gradient(45deg, #00ff88, #00cc66);',
      night: 'background: linear-gradient(45deg, #2c3e50, #8e44ad);',
      birthday: 'background: linear-gradient(45deg, #ff69b4, #ffd700);'
    };
    
    message.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      ${styles[type] || styles.normal}
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 16px;
      z-index: 10001;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      animation: coolMessageSlide 4s ease-in-out forwards;
      pointer-events: none;
      font-family: 'Inter', sans-serif;
    `;
    
    this.addMessageStyles();
    document.body.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) message.parentNode.removeChild(message);
    }, 4000);
  }

  addMessageStyles() {
    if (document.getElementById('cool-message-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'cool-message-styles';
    style.textContent = `
      @keyframes coolMessageSlide {
        0% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.8); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.8); }
      }
      
      @keyframes fireworkExplode {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.8; }
        100% { transform: scale(3); opacity: 0; }
      }
      
      @keyframes clickBombExplode {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--end-x), var(--end-y)) scale(0); opacity: 0; }
      }
      
      @keyframes trailFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
      }
      
      @keyframes birthdayFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
      }
      
      @keyframes glitchMessage {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
      }
    `;
    document.head.appendChild(style);
  }
}

// 初始化酷炫彩蛋
document.addEventListener('DOMContentLoaded', () => {
  new CoolEasterEggs();
  
  console.log(`
🎮 酷炫彩蛋系統已啟動！

🎯 按鍵彩蛋：
- Ctrl + H: Hacker 模式切換
- M: Matrix 數字雨
- G: 文字故障效果
- N: 霓虹燈模式
- C: 顯示 Console 藝術
- X: 滑鼠軌跡效果

🎊 特殊彩蛋：
- Konami Code: ↑↑↓↓←→←→BA (彩虹爆炸)
- 快速點擊 10 次: 點擊炸彈
- 深夜訪問: 特殊提示
- 生日彩蛋: 12/25 自動觸發

🏎️ F1 彩蛋 (之前添加的)：
- F: 單輛賽車
- Shift + F: 賽車競賽
- T: 車隊信息
- R: 賽道信息

享受這些隱藏的驚喜吧！🎉
  `);
});