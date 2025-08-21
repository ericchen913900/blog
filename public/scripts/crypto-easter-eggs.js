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
        case 'w': // Wallet
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