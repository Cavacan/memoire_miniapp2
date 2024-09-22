export function renderBubbles(bubblesData) {
  document.addEventListener('DOMContentLoaded', function() {
    const textWindow = document.querySelector('text-window');
    const bubbleBetweenWidth = 80;
    let currentLeft = 0;

    bubblesData.forEach( (bubbleData, index) => {
      const bubbleElement = document.createElement('div');
      bubbleElement.classList.add('bubble');
      bubbleElement.dataset.id = index; 
      bubbleElement.textContent = bubbleData.title;

      const randomTop = Math.random() * 50 + 5;
      bubbleElement.style.top = `${randomTop}vh`;
      bubbleElement.style.left = `${currentLeft}%`;
      currentLeft += bubbleBetweenWidth;
      if (currentLeft + bubbleBetweenWidth > window.innerWidth){ // 画面外描画を防ぐためマージンを多めに確保。
        currentLeft = 0;
      }

      document.body.appendChild(bubbleElement);
    
      // フェードイン
      setTimeout(() => {
        bubbleElement.style.opacity = '1';
      }, 100);

      // 上下アニメーション開始
      setTimeout(() => {
        bubbleElement.style.animation = 'seBalancer 3s infinite ease-in-out';
      }, 3500);

      // text表示を設定
      bubbleElement.addEventListener('click', () => {
        textWindow.textContent = bubbleData.text;
      })
    });

    //
    setTimeout(() => {
      textWindow.style.opacity = '1';
    }, 100);
  });
}
export function renderNoBubble() {
  const startMemory = document.createElement('div');
  startMemory.classList.add('no-memory');
  startMemory.innerHTML = "<p>これからたくさん思い出を作っていきましょう。</p>"
  document.body.appendChild(startMemory);
}