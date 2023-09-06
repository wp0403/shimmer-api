### 音乐接口列表

> 🟢 状态正常
> 🟠 可能失效
> ❌ 无法使用

| **站点** | **调用名称**  | **状态** |
| -------- | ------------- | -------- |
| 抖音音乐 | /music/douyin | 🟢       |

### 请求示例

```javascript
const getDate = async () => {
  const res = await fetch(`https://xx.xx/music/douyin`);
  const posts = await res.json();
};
```