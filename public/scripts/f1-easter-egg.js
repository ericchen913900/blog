// F1 賽車彩蛋功能
class F1EasterEgg {
  constructor() {
    this.isActive = false;
    this.carElement = null;
    this.init();
  }

  init() {
    // 監聽按鍵事件
    document.addEventListener('keydown', (e) => {
      // 按 F 鍵觸發 F1 賽車效果
      if (e.key.toLowerCase() === 'f' && !this.isActive) {
        this.triggerF1Car();
      }
      // 按 Shift + F 觸發多輛賽車
      if (e.key.toLowerCase() === 'f' && e.shiftKey && !this.isActive) {
        this.triggerF1Race();
      }
    });
  }

  createCar(delay = 0, lane = 0) {
    const car = document.createElement('div');
    car.className = 'f1-car';
    car.innerHTML = '🏎️';
    car.style.cssText = `
      position: fixed;
      left: -100px;
      top: ${200 + lane * 60}px;
      font-size: 40px;
      z-index: 9999;
      transition: none;
      pointer-events: none;
    `;
    
    document.body.appendChild(car);
    
    // 延遲啟動動畫
    setTimeout(() => {
      car.style.transition = 'left 2s ease-in-out';
      car.style.left = `${window.innerWidth + 100}px`;
      
      // 添加引擎音效（如果需要的話）
      this.playEngineSound();
      
      // 動畫完成後移除元素
      setTimeout(() => {
        if (car.parentNode) {
          car.parentNode.removeChild(car);
        }
      }, 2100);
    }, delay);
    
    return car;
  }

  triggerF1Car() {
    if (this.isActive) return;
    this.isActive = true;
    
    // 創建單輛賽車
    this.createCar();
    
    // 顯示提示信息
    this.showMessage('🏁 F1 賽車駛過！按 Shift+F 看賽車比賽！');
    
    setTimeout(() => {
      this.isActive = false;
    }, 3000);
  }

  triggerF1Race() {
    if (this.isActive) return;
    this.isActive = true;
    
    // 創建多輛賽車模擬比賽
    const cars = [
      { delay: 0, lane: 0 },
      { delay: 300, lane: 1 },
      { delay: 600, lane: 2 },
      { delay: 200, lane: 0.5 },
      { delay: 800, lane: 1.5 }
    ];
    
    cars.forEach(({ delay, lane }) => {
      this.createCar(delay, lane);
    });
    
    this.showMessage('🏁 F1 大獎賽開始！紅牛、法拉利、梅賽德斯激烈競爭！');
    
    setTimeout(() => {
      this.isActive = false;
    }, 4000);
  }

  playEngineSound() {
    // 創建簡單的引擎音效（使用 Web Audio API）
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.5);
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 1.5);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    } catch (e) {
      // 如果音效失敗就忽略
      console.log('F1 engine sound not available');
    }
  }

  showMessage(text) {
    const message = document.createElement('div');
    message.className = 'f1-message';
    message.textContent = text;
    message.style.cssText = `
      position: fixed;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(45deg, #ff0000, #ffffff);
      color: #000;
      padding: 15px 25px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 16px;
      z-index: 10000;
      box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
      animation: f1MessageSlide 3s ease-in-out forwards;
      pointer-events: none;
    `;
    
    // 添加動畫樣式
    if (!document.getElementById('f1-message-style')) {
      const style = document.createElement('style');
      style.id = 'f1-message-style';
      style.textContent = `
        @keyframes f1MessageSlide {
          0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
  }
}

// 初始化 F1 彩蛋
document.addEventListener('DOMContentLoaded', () => {
  new F1EasterEgg();
  
  // 添加隱藏的使用說明
  console.log(`
🏎️ F1 彩蛋功能已啟動！
- 按 'F' 鍵：單輛 F1 賽車駛過
- 按 'Shift + F' 鍵：F1 大獎賽模式
- 享受賽車的速度與激情！
  `);
});