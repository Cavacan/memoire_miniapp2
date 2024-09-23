export function renderBubbles(bubblesData) {
  
  document.addEventListener('DOMContentLoaded', function() {
    const textWindow = document.querySelector('#text-window');
    const pageWidth = document.documentElement.scrollWidth
    const bubbleBetweenWidth = 180;
    let currentLeft = 80;
    
    // text表示エリア
    setTimeout(() => {
      textWindow.style.opacity = '1';
    }, 100);

    bubblesData.forEach( (bubbleData, index) => {
      const bubbleElement = document.createElement('div');
      bubbleElement.classList.add('bubble');
      bubbleElement.dataset.id = index; 
      bubbleElement.textContent = bubbleData.title;

      const randomTop = Math.random() * 50 + 5;
      bubbleElement.style.transform = `translateY(100vh)`;
      bubbleElement.style.left = `${currentLeft}px`;
      document.body.appendChild(bubbleElement);

      currentLeft += bubbleBetweenWidth;
      if (currentLeft > pageWidth - bubbleBetweenWidth){ // 画面外描画を防ぐためマージンを多めに確保。
        currentLeft = 0;
      }
    
      // フェードイン
      setTimeout(() => {
        bubbleElement.style.transform = `translateY(${randomTop}vh)`;
        bubbleElement.style.opacity = '1';
      }, 100);

      // 上下アニメーション開始
      setTimeout(() => {
        createBounceAnimation(bubbleElement, randomTop);
      }, 3000 + Math.random() * 2000);

      // text表示を設定
      bubbleElement.addEventListener('click', () => {
        textWindow.textContent = bubbleData.text;
      })
    });
  });
}
export function renderNoBubble() {
  const startMemory = document.createElement('div');
  startMemory.classList.add('no-memory');
  startMemory.innerHTML = "<p>これからたくさん思い出を作っていきましょう。</p>"
  document.body.appendChild(startMemory);
}

// 個別の上下動アニメーションを作成する関数
function createBounceAnimation(bubbleElement, randomTop) {
  const bounceDistance = 5; // 上下動の範囲

  // 動的に @keyframes を作成
  const styleSheet = document.styleSheets[0];
  const animationName = `bounce-${bubbleElement.dataset.id}`;
  const keyframes = `
    @keyframes ${animationName} {
      0%, 100% {
        transform: translateY(${randomTop}vh);
      }
      50% {
        transform: translateY(${randomTop - bounceDistance}vh);
      }
    }
  `;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  // アニメーションを適用
  bubbleElement.style.animation = `${animationName} 4s infinite ease-in-out`;
}
