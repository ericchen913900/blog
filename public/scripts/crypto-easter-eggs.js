// 加密貨幣彩蛋功能
class CryptoEasterEggs {
  constructor() {
    this.cryptoData = {
      bitcoin: { symbol: '₿', name: 'Bitcoin', color: '#f7931a', emoji: '🟠' },
      ethereum: { symbol: 'Ξ', name: 'Ethereum', color: '#627eea', emoji: '💎' },
      dogecoin: { symbol: 'Ð', name: 'Dogecoin', color: '#c2a633', emoji: '🐕' },
      litecoin: { symbol: 'Ł', name: 'Litecoin', color: '#bfbbbb', emoji: '🥈' },
      cardano: { symbol: '₳', name: 'Cardano', color: '#0033ad', emoji: '🔷' },
      solana: { symbol: '◎', name: 'Solana', color: '#9945ff', emoji: '☀️' },
      polkadot: { symbol: '●', name: 'Polkadot', color: '#e6007a', emoji: '🔴' },
      chainlink: { symbol: '⬡', name: 'Chainlink', color: '#375bd2', emoji: '🔗' }
    };
    
    this.miningActive = false;
    this.walletBalance = 1337.42;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      switch(e.key.toLowerCase()) {
        case 'b': // Bitcoin
          if (e.ctrlKey) this.showCryptoPrice('bitcoin');
          break;
        case 'e': // Ethereum  
          if (e.ctrlKey) this.showCryptoPrice('ethereum');
          break;
        case 'Q': // Wallet
          if (e.ctrlKey) this.showWallet();
          break;
        case 'p': // Portfolio
          if (e.ctrlKey) this.showPortfolio();
          break;
        case 'k': // Mining
          if (e.ctrlKey) this.toggleMining();
          break;
        case 'd': // DeFi
          if (e.ctrlKey) this.showDeFiProtocols();
          break;
      }
    });

    // 隨機加密貨幣雨
    document.addEventListener('keydown', (e) => {
      if (e.key === '$' && e.shiftKey) {
        this.startCryptoRain();
      }
    });

    // 區塊鏈動畫
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'l' && e.altKey) {
        this.showBlockchainAnimation();
      }
    });
  } 
 // 顯示加密貨幣價格
  showCryptoPrice(cryptoKey) {
    const crypto = this.cryptoData[cryptoKey];
    const mockPrice = this.generateMockPrice(cryptoKey);
    const change = (Math.random() - 0.5) * 20;
    const changeColor = change >= 0 ? '#00ff88' : '#ff4757';
    const changeSymbol = change >= 0 ? '+' : '';
    
    const popup = document.createElement('div');
    popup.className = 'crypto-price-popup';
    popup.innerHTML = `
      <div class="crypto-header">
        <span class="crypto-emoji">${crypto.emoji}</span>
        <div class="crypto-info">
          <h3>${crypto.name} (${crypto.symbol})</h3>
          <div class="crypto-price">$${mockPrice.toLocaleString()}</div>
          <div class="crypto-change" style="color: ${changeColor}">
            ${changeSymbol}${change.toFixed(2)}% (24h)
          </div>
        </div>
      </div>
      <div class="crypto-chart">
        ${this.generateMiniChart()}
      </div>
      <div class="crypto-tip">Ctrl+W 查看錢包 | Ctrl+P 查看投資組合</div>
    `;

    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, ${crypto.color}20, #000);
      border: 2px solid ${crypto.color};
      color: white;
      padding: 25px;
      border-radius: 15px;
      z-index: 10001;
      max-width: 350px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: cryptoSlide 4s ease-in-out forwards;
      font-family: 'JetBrains Mono', monospace;
    `;

    this.addCryptoStyles();
    document.body.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
    }, 4000);
  }

  generateMockPrice(cryptoKey) {
    const basePrices = {
      bitcoin: 45000,
      ethereum: 2800,
      dogecoin: 0.08,
      litecoin: 95,
      cardano: 0.45,
      solana: 85,
      polkadot: 6.5,
      chainlink: 14.2
    };
    
    const basePrice = basePrices[cryptoKey] || 100;
    return basePrice * (0.8 + Math.random() * 0.4);
  }

  generateMiniChart() {
    const points = [];
    let currentPrice = 50;
    
    for (let i = 0; i < 20; i++) {
      currentPrice += (Math.random() - 0.5) * 10;
      currentPrice = Math.max(10, Math.min(90, currentPrice));
      points.push(currentPrice);
    }
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${index * 5} ${100 - point}`
    ).join(' ');
    
    return `
      <svg width="100" height="40" style="margin: 10px 0;">
        <path d="${pathData}" stroke="#00ff88" stroke-width="2" fill="none"/>
      </svg>
    `;
  }

  // 顯示錢包
  showWallet() {
    const walletPopup = document.createElement('div');
    walletPopup.className = 'crypto-wallet-popup';
    
    const holdings = [
      { crypto: 'bitcoin', amount: 0.1337, value: this.generateMockPrice('bitcoin') * 0.1337 },
      { crypto: 'ethereum', amount: 2.5, value: this.generateMockPrice('ethereum') * 2.5 },
      { crypto: 'dogecoin', amount: 10000, value: this.generateMockPrice('dogecoin') * 10000 },
      { crypto: 'solana', amount: 15.7, value: this.generateMockPrice('solana') * 15.7 }
    ];
    
    const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
    
    walletPopup.innerHTML = `
      <div class="wallet-header">
        <h3>💰 Crypto Wallet</h3>
        <div class="wallet-total">總價值: $${totalValue.toLocaleString()}</div>
      </div>
      <div class="wallet-holdings">
        ${holdings.map(holding => {
          const crypto = this.cryptoData[holding.crypto];
          return `
            <div class="holding-item">
              <span class="holding-crypto">${crypto.emoji} ${crypto.name}</span>
              <div class="holding-details">
                <div>${holding.amount} ${crypto.symbol}</div>
                <div class="holding-value">$${holding.value.toLocaleString()}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="wallet-address">
        <small>地址: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</small>
      </div>
    `;

    walletPopup.style.cssText = `
      position: fixed;
      top: 20%;
      right: 30px;
      background: linear-gradient(135deg, #2c3e50, #34495e);
      color: white;
      padding: 25px;
      border-radius: 15px;
      z-index: 10001;
      max-width: 320px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: walletSlide 5s ease-in-out forwards;
      font-family: 'JetBrains Mono', monospace;
      border: 2px solid #f39c12;
    `;

    document.body.appendChild(walletPopup);

    setTimeout(() => {
      if (walletPopup.parentNode) walletPopup.parentNode.removeChild(walletPopup);
    }, 5000);
  }  // 
顯示投資組合
  showPortfolio() {
    const portfolioData = [
      { name: 'Bitcoin', percentage: 35, color: '#f7931a' },
      { name: 'Ethereum', percentage: 25, color: '#627eea' },
      { name: 'Solana', percentage: 15, color: '#9945ff' },
      { name: 'Cardano', percentage: 10, color: '#0033ad' },
      { name: 'Others', percentage: 15, color: '#95a5a6' }
    ];

    const portfolioPopup = document.createElement('div');
    portfolioPopup.innerHTML = `
      <div class="portfolio-header">
        <h3>📊 投資組合分析</h3>
        <div class="portfolio-performance">
          <span class="perf-item">總收益: <span style="color: #00ff88">+$12,345</span></span>
          <span class="perf-item">24h: <span style="color: #00ff88">+2.34%</span></span>
        </div>
      </div>
      <div class="portfolio-chart">
        ${this.generatePieChart(portfolioData)}
      </div>
      <div class="portfolio-list">
        ${portfolioData.map(item => `
          <div class="portfolio-item">
            <div class="item-color" style="background: ${item.color}"></div>
            <span class="item-name">${item.name}</span>
            <span class="item-percentage">${item.percentage}%</span>
          </div>
        `).join('')}
      </div>
    `;

    portfolioPopup.style.cssText = `
      position: fixed;
      top: 10%;
      left: 30px;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: white;
      padding: 25px;
      border-radius: 15px;
      z-index: 10001;
      max-width: 300px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: portfolioSlide 5s ease-in-out forwards;
      font-family: 'JetBrains Mono', monospace;
      border: 2px solid #3498db;
    `;

    document.body.appendChild(portfolioPopup);

    setTimeout(() => {
      if (portfolioPopup.parentNode) portfolioPopup.parentNode.removeChild(portfolioPopup);
    }, 5000);
  }

  generatePieChart(data) {
    const size = 120;
    const center = size / 2;
    const radius = 40;
    
    let currentAngle = 0;
    const paths = data.map(item => {
      const angle = (item.percentage / 100) * 2 * Math.PI;
      const x1 = center + radius * Math.cos(currentAngle);
      const y1 = center + radius * Math.sin(currentAngle);
      const x2 = center + radius * Math.cos(currentAngle + angle);
      const y2 = center + radius * Math.sin(currentAngle + angle);
      
      const largeArc = angle > Math.PI ? 1 : 0;
      
      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      currentAngle += angle;
      
      return `<path d="${pathData}" fill="${item.color}" stroke="#000" stroke-width="1"/>`;
    }).join('');
    
    return `
      <svg width="${size}" height="${size}" style="margin: 15px auto; display: block;">
        ${paths}
      </svg>
    `;
  }

  // 挖礦動畫
  toggleMining() {
    if (this.miningActive) {
      this.stopMining();
    } else {
      this.startMining();
    }
  }

  startMining() {
    this.miningActive = true;
    
    const miningPopup = document.createElement('div');
    miningPopup.id = 'mining-popup';
    miningPopup.innerHTML = `
      <div class="mining-header">
        <h3>⛏️ 挖礦中...</h3>
        <div class="mining-status">狀態: 運行中</div>
      </div>
      <div class="mining-stats">
        <div class="stat-item">算力: <span id="hashrate">0</span> MH/s</div>
        <div class="stat-item">已挖: <span id="mined">0</span> BTC</div>
        <div class="stat-item">溫度: <span id="temp">65</span>°C</div>
      </div>
      <div class="mining-progress">
        <div class="progress-bar" id="mining-progress"></div>
      </div>
      <button onclick="window.cryptoEasterEggs.stopMining()" class="stop-mining-btn">停止挖礦</button>
    `;

    miningPopup.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #2c3e50, #34495e);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 10001;
      max-width: 250px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      font-family: 'JetBrains Mono', monospace;
      border: 2px solid #f39c12;
    `;

    document.body.appendChild(miningPopup);
    
    // 挖礦動畫
    let hashrate = 0;
    let mined = 0;
    let progress = 0;
    
    this.miningInterval = setInterval(() => {
      hashrate = 150 + Math.random() * 50;
      mined += 0.00000001;
      progress = (progress + 2) % 100;
      
      const hashrateEl = document.getElementById('hashrate');
      const minedEl = document.getElementById('mined');
      const tempEl = document.getElementById('temp');
      const progressEl = document.getElementById('mining-progress');
      
      if (hashrateEl) hashrateEl.textContent = hashrate.toFixed(1);
      if (minedEl) minedEl.textContent = mined.toFixed(8);
      if (tempEl) tempEl.textContent = (65 + Math.random() * 15).toFixed(0);
      if (progressEl) progressEl.style.width = progress + '%';
    }, 500);

    window.cryptoEasterEggs = this;
  }

  stopMining() {
    this.miningActive = false;
    if (this.miningInterval) {
      clearInterval(this.miningInterval);
    }
    
    const miningPopup = document.getElementById('mining-popup');
    if (miningPopup) {
      miningPopup.parentNode.removeChild(miningPopup);
    }
    
    this.showMessage('⛏️ 挖礦已停止！', 'mining');
  } 
 // 加密貨幣雨
  startCryptoRain() {
    const symbols = Object.values(this.cryptoData).map(crypto => crypto.symbol);
    const emojis = Object.values(this.cryptoData).map(crypto => crypto.emoji);
    const allSymbols = [...symbols, ...emojis];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const symbol = document.createElement('div');
        symbol.textContent = allSymbols[Math.floor(Math.random() * allSymbols.length)];
        symbol.style.cssText = `
          position: fixed;
          left: ${Math.random() * window.innerWidth}px;
          top: -50px;
          font-size: ${20 + Math.random() * 20}px;
          color: #f39c12;
          z-index: 9999;
          pointer-events: none;
          animation: cryptoFall ${3 + Math.random() * 2}s linear forwards;
          text-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(symbol);
        
        setTimeout(() => {
          if (symbol.parentNode) symbol.parentNode.removeChild(symbol);
        }, 5000);
      }, i * 100);
    }
    
    this.showMessage('💰 加密貨幣雨來了！', 'crypto');
  }

  // 區塊鏈動畫
  showBlockchainAnimation() {
    const blockchain = document.createElement('div');
    blockchain.className = 'blockchain-animation';
    
    const blocks = [];
    for (let i = 0; i < 5; i++) {
      blocks.push(`
        <div class="block" style="animation-delay: ${i * 0.5}s">
          <div class="block-header">Block #${1000 + i}</div>
          <div class="block-hash">${this.generateHash()}</div>
          <div class="block-txs">${Math.floor(Math.random() * 100)} txs</div>
        </div>
      `);
    }
    
    blockchain.innerHTML = `
      <div class="blockchain-container">
        <h3>🔗 區塊鏈網絡</h3>
        <div class="blocks-container">
          ${blocks.join('')}
        </div>
        <div class="network-stats">
          <div>網絡算力: 150 EH/s</div>
          <div>確認時間: ~10 分鐘</div>
          <div>節點數量: 15,000+</div>
        </div>
      </div>
    `;
    
    blockchain.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #0f0f23, #1a1a2e);
      color: white;
      padding: 30px;
      border-radius: 15px;
      z-index: 10001;
      max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: blockchainSlide 6s ease-in-out forwards;
      font-family: 'JetBrains Mono', monospace;
      border: 2px solid #00ff88;
    `;
    
    document.body.appendChild(blockchain);
    
    setTimeout(() => {
      if (blockchain.parentNode) blockchain.parentNode.removeChild(blockchain);
    }, 6000);
  }

  generateHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 8; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash + '...';
  }

  // DeFi 協議
  showDeFiProtocols() {
    const protocols = [
      { name: 'Uniswap', tvl: '$8.2B', apy: '12.5%', emoji: '🦄' },
      { name: 'Aave', tvl: '$6.1B', apy: '8.3%', emoji: '👻' },
      { name: 'Compound', tvl: '$4.8B', apy: '6.7%', emoji: '🏛️' },
      { name: 'MakerDAO', tvl: '$9.5B', apy: '5.2%', emoji: '🏭' },
      { name: 'Curve', tvl: '$3.9B', apy: '15.8%', emoji: '📈' }
    ];
    
    const defiPopup = document.createElement('div');
    defiPopup.innerHTML = `
      <div class="defi-header">
        <h3>🏦 DeFi 協議</h3>
        <div class="defi-total">總鎖倉價值: $32.5B</div>
      </div>
      <div class="defi-protocols">
        ${protocols.map(protocol => `
          <div class="protocol-item">
            <span class="protocol-emoji">${protocol.emoji}</span>
            <div class="protocol-info">
              <div class="protocol-name">${protocol.name}</div>
              <div class="protocol-stats">
                <span>TVL: ${protocol.tvl}</span>
                <span class="protocol-apy">APY: ${protocol.apy}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="defi-warning">
        ⚠️ DeFi 投資有風險，請謹慎操作
      </div>
    `;
    
    defiPopup.style.cssText = `
      position: fixed;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #8e44ad, #3498db);
      color: white;
      padding: 25px;
      border-radius: 15px;
      z-index: 10001;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      animation: defiSlide 5s ease-in-out forwards;
      font-family: 'JetBrains Mono', monospace;
    `;
    
    document.body.appendChild(defiPopup);
    
    setTimeout(() => {
      if (defiPopup.parentNode) defiPopup.parentNode.removeChild(defiPopup);
    }, 5000);
  }

  // 通用訊息顯示
  showMessage(text, type = 'normal') {
    const message = document.createElement('div');
    message.textContent = text;
    
    const styles = {
      normal: 'background: linear-gradient(45deg, #667eea, #764ba2);',
      crypto: 'background: linear-gradient(45deg, #f39c12, #e67e22);',
      mining: 'background: linear-gradient(45deg, #2c3e50, #34495e);'
    };
    
    message.style.cssText = `
      position: fixed;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      ${styles[type] || styles.normal}
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 16px;
      z-index: 10002;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      animation: cryptoMessageSlide 3s ease-in-out forwards;
      pointer-events: none;
      font-family: 'JetBrains Mono', monospace;
    `;
    
    this.addCryptoStyles();
    document.body.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) message.parentNode.removeChild(message);
    }, 3000);
  }  a
ddCryptoStyles() {
    if (document.getElementById('crypto-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'crypto-styles';
    style.textContent = `
      @keyframes cryptoSlide {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }
      
      @keyframes walletSlide {
        0% { opacity: 0; transform: translateX(100%); }
        15% { opacity: 1; transform: translateX(0); }
        85% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(100%); }
      }
      
      @keyframes portfolioSlide {
        0% { opacity: 0; transform: translateX(-100%); }
        15% { opacity: 1; transform: translateX(0); }
        85% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(-100%); }
      }
      
      @keyframes blockchainSlide {
        0% { opacity: 0; transform: translate(-50%, -50%) rotateY(90deg); }
        15% { opacity: 1; transform: translate(-50%, -50%) rotateY(0deg); }
        85% { opacity: 1; transform: translate(-50%, -50%) rotateY(0deg); }
        100% { opacity: 0; transform: translate(-50%, -50%) rotateY(-90deg); }
      }
      
      @keyframes defiSlide {
        0% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
      }
      
      @keyframes cryptoFall {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
      
      @keyframes cryptoMessageSlide {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
      
      .crypto-price-popup .crypto-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }
      
      .crypto-price-popup .crypto-emoji {
        font-size: 30px;
      }
      
      .crypto-price-popup .crypto-price {
        font-size: 24px;
        font-weight: bold;
        margin: 5px 0;
      }
      
      .crypto-price-popup .crypto-change {
        font-size: 14px;
        font-weight: bold;
      }
      
      .crypto-price-popup .crypto-tip {
        margin-top: 15px;
        font-size: 12px;
        opacity: 0.8;
        text-align: center;
        border-top: 1px solid rgba(255,255,255,0.2);
        padding-top: 10px;
      }
      
      .wallet-header, .portfolio-header, .defi-header {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .wallet-total, .portfolio-performance, .defi-total {
        font-size: 18px;
        font-weight: bold;
        color: #f39c12;
        margin-top: 5px;
      }
      
      .holding-item, .portfolio-item, .protocol-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      .holding-details {
        text-align: right;
      }
      
      .holding-value {
        color: #00ff88;
        font-weight: bold;
      }
      
      .item-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      .protocol-apy {
        color: #00ff88;
        font-weight: bold;
      }
      
      .wallet-address {
        margin-top: 15px;
        text-align: center;
        opacity: 0.6;
      }
      
      .mining-stats {
        margin: 15px 0;
      }
      
      .stat-item {
        margin: 5px 0;
        font-size: 14px;
      }
      
      .mining-progress {
        background: rgba(255,255,255,0.2);
        height: 8px;
        border-radius: 4px;
        margin: 15px 0;
        overflow: hidden;
      }
      
      .progress-bar {
        background: linear-gradient(90deg, #f39c12, #e67e22);
        height: 100%;
        width: 0%;
        transition: width 0.5s ease;
      }
      
      .stop-mining-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-family: inherit;
        font-size: 12px;
      }
      
      .stop-mining-btn:hover {
        background: #c0392b;
      }
      
      .blocks-container {
        display: flex;
        gap: 10px;
        margin: 20px 0;
        overflow-x: auto;
      }
      
      .block {
        min-width: 120px;
        background: rgba(0,255,136,0.1);
        border: 1px solid #00ff88;
        border-radius: 8px;
        padding: 10px;
        animation: blockPulse 2s infinite;
      }
      
      .block-header {
        font-weight: bold;
        color: #00ff88;
        margin-bottom: 5px;
      }
      
      .block-hash {
        font-size: 12px;
        color: #95a5a6;
        margin-bottom: 5px;
      }
      
      .block-txs {
        font-size: 12px;
        color: #3498db;
      }
      
      @keyframes blockPulse {
        0%, 100% { box-shadow: 0 0 5px #00ff88; }
        50% { box-shadow: 0 0 20px #00ff88; }
      }
      
      .network-stats {
        font-size: 12px;
        opacity: 0.8;
        text-align: center;
      }
      
      .defi-warning {
        margin-top: 15px;
        font-size: 12px;
        text-align: center;
        opacity: 0.8;
        color: #f39c12;
      }
    `;
    document.head.appendChild(style);
  }
}

// 初始化加密貨幣彩蛋
document.addEventListener('DOMContentLoaded', () => {
  new CryptoEasterEggs();
  
  console.log(`
💰 加密貨幣彩蛋系統已啟動！

🪙 加密貨幣彩蛋：
- Ctrl + B: Bitcoin 價格
- Ctrl + E: Ethereum 價格  
- Ctrl + W: 查看錢包
- Ctrl + P: 投資組合
- Ctrl + K: 開始/停止挖礦
- Ctrl + D: DeFi 協議
- Shift + $: 加密貨幣雨
- Alt + L: 區塊鏈動畫

💎 特色功能：
- 實時模擬價格
- 投資組合圓餅圖
- 挖礦模擬器
- 區塊鏈可視化
- DeFi 協議展示

⚠️ 注意：所有數據僅供娛樂，非真實交易建議！

To the moon! 🚀🌙
  `);
});