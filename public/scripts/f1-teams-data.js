// F1 車隊數據彩蛋
const F1_TEAMS_2024 = {
  'red-bull': {
    name: 'Red Bull Racing',
    drivers: ['Max Verstappen', 'Sergio Pérez'],
    color: '#0600EF',
    emoji: '🐂',
    championships: 6,
    founded: 2005
  },
  'ferrari': {
    name: 'Scuderia Ferrari',
    drivers: ['Charles Leclerc', 'Carlos Sainz Jr.'],
    color: '#DC143C',
    emoji: '🐎',
    championships: 16,
    founded: 1950
  },
  'mercedes': {
    name: 'Mercedes-AMG Petronas',
    drivers: ['Lewis Hamilton', 'George Russell'],
    color: '#00D2BE',
    emoji: '⭐',
    championships: 8,
    founded: 2010
  },
  'mclaren': {
    name: 'McLaren F1 Team',
    drivers: ['Lando Norris', 'Oscar Piastri'],
    color: '#FF8700',
    emoji: '🧡',
    championships: 8,
    founded: 1966
  },
  'aston-martin': {
    name: 'Aston Martin Aramco',
    drivers: ['Fernando Alonso', 'Lance Stroll'],
    color: '#006F62',
    emoji: '💚',
    championships: 0,
    founded: 2021
  }
};

// 添加 F1 車隊信息彩蛋
class F1TeamsEasterEgg {
  constructor() {
    this.currentTeamIndex = 0;
    this.teams = Object.values(F1_TEAMS_2024);
    this.init();
  }

  init() {
    // 按 'T' 鍵顯示車隊信息
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
        this.showTeamInfo();
      }
      // 按 'R' 鍵顯示隨機賽道
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.altKey) {
        this.showRandomTrack();
      }
    });
  }

  showTeamInfo() {
    const team = this.teams[this.currentTeamIndex];
    this.currentTeamIndex = (this.currentTeamIndex + 1) % this.teams.length;

    const popup = document.createElement('div');
    popup.className = 'f1-team-popup';
    popup.innerHTML = `
      <div class="team-header">
        <span class="team-emoji">${team.emoji}</span>
        <h3>${team.name}</h3>
      </div>
      <div class="team-info">
        <p><strong>車手：</strong>${team.drivers.join(' & ')}</p>
        <p><strong>成立：</strong>${team.founded}</p>
        <p><strong>冠軍：</strong>${team.championships} 次</p>
      </div>
      <div class="team-tip">按 'T' 查看下一個車隊 | 按 'R' 查看賽道</div>
    `;

    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, ${team.color}20, #000);
      border: 2px solid ${team.color};
      color: white;
      padding: 25px;
      border-radius: 15px;
      z-index: 10001;
      max-width: 350px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: f1TeamSlide 4s ease-in-out forwards;
      font-family: 'Inter', sans-serif;
    `;

    // 添加樣式
    if (!document.getElementById('f1-team-style')) {
      const style = document.createElement('style');
      style.id = 'f1-team-style';
      style.textContent = `
        @keyframes f1TeamSlide {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        .f1-team-popup .team-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        .f1-team-popup .team-emoji {
          font-size: 30px;
        }
        .f1-team-popup h3 {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
        }
        .f1-team-popup .team-info p {
          margin: 8px 0;
          font-size: 14px;
        }
        .f1-team-popup .team-tip {
          margin-top: 15px;
          font-size: 12px;
          opacity: 0.8;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 10px;
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 4000);
  }

  showRandomTrack() {
    const tracks = [
      { name: '摩納哥大獎賽', emoji: '🏰', difficulty: '極難' },
      { name: '銀石賽道', emoji: '🇬🇧', difficulty: '困難' },
      { name: '蒙扎賽道', emoji: '🇮🇹', difficulty: '中等' },
      { name: '鈴鹿賽道', emoji: '🇯🇵', difficulty: '困難' },
      { name: '斯帕賽道', emoji: '🇧🇪', difficulty: '困難' },
      { name: '巴西聖保羅', emoji: '🇧🇷', difficulty: '中等' },
      { name: '新加坡街道賽', emoji: '🌃', difficulty: '極難' },
      { name: '阿布達比亞斯碼頭', emoji: '🏜️', difficulty: '中等' }
    ];

    const track = tracks[Math.floor(Math.random() * tracks.length)];
    
    const popup = document.createElement('div');
    popup.className = 'f1-track-popup';
    popup.innerHTML = `
      <div class="track-header">
        <span class="track-emoji">${track.emoji}</span>
        <h3>${track.name}</h3>
      </div>
      <div class="track-info">
        <p><strong>難度：</strong>${track.difficulty}</p>
        <p>🏁 準備好挑戰這條賽道了嗎？</p>
      </div>
    `;

    popup.style.cssText = `
      position: fixed;
      top: 20%;
      right: 30px;
      background: linear-gradient(135deg, #ff6b35, #f7931e);
      color: white;
      padding: 20px;
      border-radius: 12px;
      z-index: 10001;
      max-width: 280px;
      box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
      animation: f1TrackSlide 3.5s ease-in-out forwards;
      font-family: 'Inter', sans-serif;
    `;

    if (!document.getElementById('f1-track-style')) {
      const style = document.createElement('style');
      style.id = 'f1-track-style';
      style.textContent = `
        @keyframes f1TrackSlide {
          0% { opacity: 0; transform: translateX(100%); }
          20% { opacity: 1; transform: translateX(0); }
          80% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(100%); }
        }
        .f1-track-popup .track-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .f1-track-popup .track-emoji {
          font-size: 24px;
        }
        .f1-track-popup h3 {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
        }
        .f1-track-popup .track-info p {
          margin: 6px 0;
          font-size: 13px;
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 3500);
  }
}

// 初始化 F1 車隊彩蛋
document.addEventListener('DOMContentLoaded', () => {
  new F1TeamsEasterEgg();
  
  console.log(`
🏎️ F1 車隊彩蛋已啟動！
- 按 'T' 鍵：查看 F1 車隊信息
- 按 'R' 鍵：隨機顯示 F1 賽道
- 按 'F' 鍵：F1 賽車駛過效果
- 按 'Shift + F'：F1 大獎賽模式
🏁 享受 F1 的速度與激情！
  `);
});