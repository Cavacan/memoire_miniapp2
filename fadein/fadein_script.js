// 情報を保持する配列
const data_table = [
  { "id": 1, "text": "First circle" },
  { "id": 2, "text": "Second circle" }
];
const circle = document.getElementById('circle');
const circle2 = document.getElementById('circle2');
const viewHeight = document.documentElement.clientHeight;

const circle2Data = data_table.find(item => item.id === 2);
circle2.textContent = circle2Data.text;

function fadein_circle(crcl) {
  crcl.style.transform = 'translateY(0)';
  crcl.style.opacity = '1';
};

document.addEventListener('DOMContentLoaded', function() {
  const circles = document.querySelectorAll('.circle');
  setTimeout(() => {
    // フェードイン
    circles.forEach(circle => {
      circle.style.transform = 'translateY(0)';
      circle.style.opacity = '1';
    });

    // 上下アニメーション開始
    setTimeout(() => {
      circles.forEach(circle => {
        circle.style.animation = 'seBalancer 3s infinite ease-in-out';
      })
    }, 3500);
  }, 100);
});
