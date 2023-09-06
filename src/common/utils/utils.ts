import { v4 as uuidv4 } from 'uuid';

// 生成随机数
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// 生成uuid
export function generateRequestId() {
  return uuidv4();
}

// 将 ipv6 转 ipv4
export function convertIPv6ToIPv4(ip) {
  if (ip === '::1') {
    return '127.0.0.1'
  }
  const ipv6Regex = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i;
  const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i;

  if (ipv6Regex.test(ip)) {
    const match = ip.match(ipv4Regex);
    if (match) {
      return match[1]; // 提取IPv4地址部分
    }
  }

  return ip; // 非IPv6地址，返回原始地址
}

// 随机数生成工具函数
// 'x' 选项,返回一个0到窗口宽度之间的随机数
// 'y' 选项,返回一个0到窗口高度之间的随机数
// 's' 选项,返回一个0到1之间的随机数
// 'r' 选项,返回一个0到6之间的随机数
// 'fnx' 选项,返回一个函数,该函数会得到一个x随机偏移量
// 'fny' 选项,返回一个函数,该函数会得到一个y随机正偏移量
// 'fnr' 选项,返回一个函数,该函数会得到一个小的随机角度偏移量
export function getRandom(option) {
  var ret, random;
  switch (option) {
    case 'x':
      ret = Math.random() * window.innerWidth;
      break;
    case 'y':
      ret = Math.random() * window.innerHeight;
      break;
    case 's':
      ret = Math.random();
      break;
    case 'r':
      ret = Math.random() * 6;
      break;
    case 'fnx':
      random = -0.5 + Math.random() * 1;
      ret = function (x, y) {
        return x + 0.5 * random - 1.7;
      };
      break;
    case 'fny':
      random = 1.5 + Math.random() * 0.7;
      ret = function (x, y) {
        return y + random;
      };
      break;
    case 'fnr':
      random = Math.random() * 0.03;
      ret = function (r) {
        return r + random;
      };
      break;
  }
  return ret;
}

// 判断url是否包含http:// https:// 如果包含则去掉
export function backDelHttpsUrl(url) {
  // 判断是否包含 http://
  if (/^http:\/\//.test(url)) {
    url = url.replace(/^http:\/\//, '');
  }

  // 判断是否包含 https://
  if (/^https:\/\//.test(url)) {
    url = url.replace(/^https:\/\//, '');
  }
  return url;
}

// 判断url是否包含http:// https:// 如果不包含则添加https
export function backAddHttpsUrl(url) {
  // 判断是否包含http://或https://
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  // 不包含则构造一个默认 https 的 URL
  return `https://${url}`;
}

// 判断url是否包含http:// https://
export function processUrl(url) {
  // 不包含则构造一个默认 https 的 URL
  return /^https?:\/\//.test(url);
}