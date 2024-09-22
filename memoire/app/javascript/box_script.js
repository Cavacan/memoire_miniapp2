const areaC = document.querySelector('.areaC');
const rectA = document.querySelector('.rectA');
const rectB = document.querySelector('.rectB');

areaC.addEventListener('click', () => {
    // AとBのアニメーションクラスを追加
    rectA.classList.add('animate');
    rectB.classList.add('animate');
    
    // アニメーション終了後に画面遷移をする例（任意の処理をここに追加）
    setTimeout(() => {
        // console.log('画面遷移へ');
        window.location.href = "<%= image_index_path %>";
    }, 2000); // アニメーションの時間に合わせて設定
});
