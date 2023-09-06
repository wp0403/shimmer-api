### 新闻接口列表

> 🟢 状态正常
> 🟠 可能失效
> ❌ 无法使用

| **站点** | **调用名称**   | **状态** |
| --------| --------------| --------|
| 百度     | /news/baidu   | 🟢      |
| 微博     | /news/weibo   | 🟢      |
| 头条     | /news/toutiao   | 🟢      |
| 知乎     | /news/zhihu   | 🟢      |
| 掘金     | /news/juejin   | 🟢      |
| 澎湃     | /news/thepaper   | 🟢      |
| 36氪     | /news/36kr   | 🟢      |
| 网易     | /news/netease   | 🟢      |
| 腾讯     | /news/tencent   | 🟢      |
| bilibili     | /news/bilibili   | 🟢      |
| 少数派     | /news/sspai   | 🟢      |
| 抖音     | /news/douyin   | 🟢      |
| 快手     | /news/kuaishou   | 🟢      |
| 贴吧     | /news/tieba   | 🟢      |
| it之家     | /news/ithome   | 🟢      |

### 请求示例

```javascript
const getDate = async () => {
  const res = await fetch(`https://xx.xx/news/baidu`);
  const posts = await res.json();
}
```