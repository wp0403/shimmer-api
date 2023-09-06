/*
 * @Descripttion: 雪花生成js
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-27 18:29:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-29 00:42:46
 */
// 创建canvas
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.setAttribute(
  'style',
  'position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 99999;pointer-events: none;',
);
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// 雪花数组
const snowflakes = [];

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// 雪花类
function Snowflake(flag = false) {
  if (flag) {
    this.x = Math.random() * canvas.width;
    this.y = 0;
  } else {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
  this.c = getRandomNumber(0.6, 1);

  // 随机速度
  this.vx = Math.random() * 2 - 1;
  this.vy = 1 + Math.random(); // 向下速度

  this.radius = Math.random() * 4 + 1;

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      // 如果雪花超出canvas边界，则移除当前雪花对象
      const index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);

      // 重新生成一个新的雪花对象
      snowflakes.push(new Snowflake(true));
    }
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.c})`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  };
  // 鼠标移动处理
  this.mouseMove = function (x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      // 距离小于200时计算角度
      let angle = Math.atan2(dy, dx);
      // 设置避开的速度
      let vx = Math.cos(angle);
      let vy = Math.sin(angle);
      this.vx = -vx;
      this.vy = -vy;
      this.isFlag = true;
    } else if (dist > 300 && this.isFlag) {
      // 距离大于200时恢复下落速度
      this.vx = Math.random() * 2 - 1;
      this.vy = 1 + Math.random();
      this.isFlag = false;
    }
  };
}

// 生成雪花
for (let i = 0; i < 130; i++) {
  snowflakes.push(new Snowflake());
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((flake) => {
    flake.update();
    flake.draw();

    flake.mouseMove(mouseX, mouseY); // 处理鼠标
  });

  requestAnimationFrame(animate);
}

// 鼠标位置
let mouseX, mouseY;

// 鼠标移动
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// 鼠标移出
window.addEventListener('mouseout', () => {
  mouseX = undefined;
  mouseY = undefined;
});

// 开启动画
window.onload = animate;

const blogLink = 'https://wp-boke.work';
console.group(
  '%c 作者信息',
  'color: #ffffff; background: #2c9678; padding:5px',
);
console.log(
  `%c shimmer博客 ${blogLink}`,
  'color: #fff; background: #2c9678; padding:5px',
);
console.log(
  `%c 如果对你有帮助，请帮我点个star吧(⃔* 'ㅅ'*)⃕`,
  'color: #fff; background: #2c9678; padding:5px',
);
console.groupEnd();
