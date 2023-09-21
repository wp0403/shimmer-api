### 图片接口列表

> 🟢 状态正常
> 🟠 可能失效
> ❌ 无法使用

| **站点** | **调用名称**   | **状态** |
| --------| --------------| --------|
| 360壁纸分类     | /picture/type-list-360   | 🟢      |
| 360壁纸     | /picture/list-360   | 🟢      |
| 必应每日壁纸     | /picture/daily-bing   | 🟢      |
| 必应每日壁纸     | /picture/daily-bing   | 🟢      |
| Pexels精选图片列表   | /picture/pexels-curated   | 🟢  |
| Pexels搜索图片列表   | /picture/pexels-search   | 🟢  |

### 请求示例

```javascript
const getDate = async () => {
  const res = await fetch(`https://xx.xx/picture/list-360`);
  const posts = await res.json();
}
```