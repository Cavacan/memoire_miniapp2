document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.container');

  // シャボン玉を複数生成する関数
  function createBubble() {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      // ランダムな位置とサイズを設定
      const size = Math.random() * 50 + 50; // 50pxから100pxまでのランダムなサイズ
      const posX = Math.random() * (window.innerWidth - size); // ウィンドウ幅内に収める
      const posY = Math.random() * (window.innerHeight - size); // ウィンドウ高さ内に収める

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}px`;
      bubble.style.top = `${posY}px`;

      container.appendChild(bubble);
  }

  // 10個のシャボン玉を生成
  for (let i = 0; i < 10; i++) {
      createBubble();
  }
});
