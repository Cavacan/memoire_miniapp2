const areaC = document.querySelector('.areaC');
const rectA = document.querySelector('.rectA');
const rectB = document.querySelector('.rectB');

areaC.addEventListener('click', () => {
    // AとBのアニメーションクラスを追加
    rectA.classList.add('animate');
    rectB.classList.add('animate');
    
    // アニメーション終了後に画面遷移をする例（任意の処理をここに追加）
    setTimeout(() => {
        // 画面遷移の処理をここに追加する (例: location.href = 'nextpage.html';)
        console.log('画面遷移へ');
    }, 2000); // アニメーションの時間に合わせて設定
});
