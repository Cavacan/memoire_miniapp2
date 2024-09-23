const areaC = document.querySelector('.areaC');
const boxA = document.querySelector('.boxA');
const boxB = document.querySelector('.boxB');

areaC.addEventListener('click', () => {
    boxA.classList.add('animate');
    boxB.classList.add('animate');
    
    setTimeout(() => {
        // console.log('画面遷移へ');
        window.location.href = areaC.getAttribute('data-url');
    }, 2000);
});
