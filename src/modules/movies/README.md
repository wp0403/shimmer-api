<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-09-21 11:41:57
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-21 11:43:14
-->
### 视频接口列表

> 🟢 状态正常
> 🟠 可能失效
> ❌ 无法使用

| **站点** | **调用名称**   | **状态** |
| --------| --------------| --------|
| Pexels热门视频列表     | /movies/pexels-popular   | 🟢      |
| Pexels搜索视频列表     | /movies/pexels-search   | 🟢      |

### 请求示例

```javascript
const getDate = async () => {
  const res = await fetch(`https://xx.xx/movies/pexels-popular`);
  const posts = await res.json();
}
```