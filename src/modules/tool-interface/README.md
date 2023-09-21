### 工具接口列表

> 🟢 状态正常
> 🟠 可能失效
> ❌ 无法使用

| **站点** | **调用名称**  | **状态** |
| -------- | ------------- | -------- |
| 解析 ip | /tool/parsing-ip | 🟢      |
| 查询当前链接收录 | /tool/included | ❌      |
| 获取网站信息 | /tool/website-info | 🟢      |
| 获取网站icon | /tool/website-icon | 🟢      |

### 请求示例

```javascript
const getDate = async () => {
  const res = await fetch(`https://xx.xx/tool/parsing-ip`);
  const posts = await res.json();
};
```

```javascript
const getDate = async () => {
  const res = await fetch(`https://xx.xx/tool/included?url=wp-boke.work`);
  const posts = await res.json();
};
```