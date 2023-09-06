/*
 * @Descripttion: 波浪js
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-27 18:29:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-29 00:41:49
 */
const initWave = () => {
  // 创建style
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = `
.wave_box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  pointer-events: none;
}
.waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}
.simple-waves > use {
  animation: wavy 55s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.simple-waves > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.simple-waves > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.simple-waves > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.simple-waves > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 16s;
}
.simple-waves > use:nth-child(5) {
  animation-delay: -4s;
  animation-duration: 20s;
}
@keyframes wavy {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
}
`;
  document.querySelector('head').appendChild(style);

  // 新建波浪盒子
  const waveBox = document.createElement('div');
  waveBox.setAttribute('class', 'wave_box');
  waveBox.innerHTML = `
<svg
class="waves"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 24 150 28"
preserveAspectRatio="none"
shape-rendering="auto"
>
<defs>
  <path
    id="gentle-wave"
    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
  />
</defs>
<g class="simple-waves">
  <use
    xlink:href="#gentle-wave"
    x="48"
    y="0"
    fill="rgba(255,255,255,0.3)"
  />
  <use
    xlink:href="#gentle-wave"
    x="48"
    y="3"
    fill="rgba(255,255,255,0.4)"
  />
  <use
    xlink:href="#gentle-wave"
    x="48"
    y="5"
    fill="rgba(255,255,255,0.5)"
  />
  <use
    xlink:href="#gentle-wave"
    x="48"
    y="7"
    fill="rgba(255,255,255,0.6)"
  />
</g>
</svg>
`;
  document.querySelector('body').appendChild(waveBox);
};

window.onload = initWave;

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
