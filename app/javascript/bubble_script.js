export let currentBubble = null; 

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
        currentLeft = 80;
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
        currentBubble = index;
        textWindow.textContent = bubbleData.text;
      })

      // text-windowにクリックで編集画面呼び出す機能を追加
      textWindow.addEventListener('click', () => {
        if (document.querySelector('.edit-window')) {
          return;
        }else if (currentBubble != null) {
          createEditWindow(bubblesData[currentBubble]);
        }
      })
    });

    newBubbleButton();
  });
}
export function renderNoBubble() {
  const startMemory = document.createElement('div');
  startMemory.classList.add('no-memory');
  startMemory.innerHTML = "<p>これからたくさん思い出を作っていきましょう。</p>"
  document.body.appendChild(startMemory);

  newBubbleButton();
  document.querySelector('#text-window').style.opacity = '1';
  createBubbleWindow();
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

// 編集機能　一式
function createEditWindow(bubbleData) {
  const editWindow = document.createElement('div');
  editWindow.classList.add('edit-window');

  // edit画面を作成
  editWindow.innerHTML = `
  <h3 style="text-align: center; margin-bottom: 5px;">思い出を変える</h3>
  <form id='editForm'>
    <div style="margin-bottom: 10px;">
      <label for='title'>タイトル:</label>
      <input type='text' name='title' value="${bubbleData.title}" style="width: 100%;"/>
    </div>
    <div style="margin-bottom: 10px;">
      <label for='text'>内容:</label>
      <textarea name='text' style="width: 100%; height: 100px;">${bubbleData.text}</textarea>
    </div>
    <div style="margin-top: 10px; text-align: right;">
      <button type='submit'>上書き</button>
      <button type='button' class='cancelButton'>取り消し</button>
    </div>
  </form>
  `;
  document.body.appendChild(editWindow);

  editWindow.style.display = 'block';

  // キャンセルボタンにedit画面削除を追加
  editWindow.querySelector('.cancelButton').addEventListener('click', () => {
    editWindow.remove();
  });

  // Saveボタン　更新
  document.getElementById('editForm').addEventListener('submit', (e) => {
    // 画面の再読み込みを阻止
    e.preventDefault();

    // 編集内容を取得
    const title = editWindow.querySelector('input[name="title"]').value;
    const text = editWindow.querySelector('textarea[name="text"]').value;

    updateBubble(currentBubble, { title, text });
    editWindow.remove();
  });
}

// fetchを使ってデータを更新
function updateBubble(bubbleId, updateData) {
  fetch(`/images/${bubbleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    },
    body: JSON.stringify({ bubble: updateData }),
  })
  .then(response => response.json())
  .then(data => {
    const editWindow = document.querySelector('.edit-window');
    if (editWindow) {
      editWindow.remove();
    }

    // 表示されているbubbleのタイトルを更新
    document.querySelector(`.bubble[data-index="${bubbleId}"]`).textContent = data.title;
  
    // text-window画面のtextを更新
    const textWindow = document.querySelector('#text-window');
    textWindow.textContent = data.text;
  })
  .catch(error => {
    console.log('Error updating Memory: ', error);
  });
}

// 思い出登録用bubbleボタン
function newBubbleButton (){
  const newBubble = document.createElement('div');
  newBubble.classList.add('newBubble');
  newBubble.textContent = '+';
  newBubble.style.left = '90%';
  newBubble.style.top = '55%';
  document.body.appendChild(newBubble);

  newBubble.addEventListener('click', () => {
    createBubbleWindow();
  });
}

// 新規思い出登録
function createBubbleWindow() {
  if (document.querySelector('.create-window')) {
    return;
  }
  const createWindow = document.createElement('div');
  createWindow.classList.add('create-window');

  // 作成画面を作成
  createWindow.innerHTML = `
  <h3 style="text-align: center; margin-bottom: 5px;">思い出を作成</h3>
  <form id='createForm'>
    <div style="margin-bottom: 10px;">
      <label for='title'>タイトル:</label>
      <input type='text' name='title' style="width: 100%;" required/>
    </div>
    <div style="margin-bottom: 10px;">
      <label for='text'>内容:</label>
      <textarea name='text' style="width: 100%; height: 100px;" required></textarea>
    </div>
    <div style="margin-top: 10px; text-align: right;">
      <button type='submit'>思い出を作る</button>
      <button type='button' class='cancelNew'>取り消し</button>
    </div>
  </form>
  `;
  document.body.appendChild(createWindow);

  // キャンセルボタンに新規登録画面削除を追加
  document.querySelector('.cancelNew').addEventListener('click', () => {
    createWindow.remove();
  });

  // Saveボタン　更新
  document.getElementById('createForm').addEventListener('submit', (e) => {
    // 画面の再読み込みを阻止
    e.preventDefault();

    // 作成内容を取得
    const title = createWindow.querySelector('input[name="title"]').value;
    const text = createWindow.querySelector('textarea[name="text"]').value;

    createBubble( { title, text } );
    createWindow.remove();
  });
}

function createBubble(newData) {
  fetch(`/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    },
    body: JSON.stringify({ bubble: newData }),
  })
  .then(response => response.json())
  .then(data => {
    addNewBubbleToPage(data);
  })
  .catch(error => {
    console.log('Error creating bubble :', error);
  });
}

function addNewBubbleToPage(bubbleData) {
  const textWindow = document.querySelector('#text-window');
  let currentLeft = 80

  const newBubbleElement = document.createElement('div');
  newBubbleElement.classList.add('bubble');
  newBubbleElement.dataset.id = bubbleData.id;
  newBubbleElement.textContent = bubbleData.title;

  const randomTop = Math.random() * 50 + 5;
  newBubbleElement.style.transform = `translateY(100vh)`;
  newBubbleElement.style.left = `${currentLeft}px`;
  document.body.appendChild(newBubbleElement);

  setTimeout(() =>{
    newBubbleElement.style.transform = `translateY(${randomTop}vh)`;
    newBubbleElement.style.opacity = '1';
  }, 100)

  setTimeout(() => {
    createBounceAnimation(newBubbleElement, randomTop);
  }, 3000);

  newBubbleElement.addEventListener('click', () => {
    currentBubble = bubbleData.id;
    textWindow.textContent = bubbleData.text;
  });
}

