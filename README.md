# 项目名称

本项目由<a href='https://github.com/wp0403'>shimmer</a>独立编写，提供 api 聚合服务，私有化部署，以及二次开发，满足独立开发者的数据需求。

项目灵感，及参考来源 https://github.com/imsyy/DailyHotApi

## 安装和运行

本项目推荐使用 vercel、render 等云部署方案，也可以在自己服务器部署。

# 克隆项目代码

git clone https://github.com/wp0403/shimmer-api.git

# 安装依赖

cd shimmer-api

pnpm install

# 配置环境变量

PORT=3008

# 启动项目

pnpm start

## 使用方法

启动项目后，可以查看对应的接口文档，获取接口返回类型（vercel 部署不支持接口文档，暂未找到解决办法）。
http://localhost:3008/swagger

## 部署

部署本项目非常灵活，现提供下面几种部署方式(私有部署请 fork 本项目后进行)

### Vercel 部署(https://vercel.com/dashboard)

1. 在 Vercel 上创建一个新项目。
2. 配置环境变量并设置相关的值。
3. 部署项目到 Vercel。

### Render 部署(https://dashboard.render.com/)

1. 在 Render 上创建一个新的私有部署项目。
2. 设置环境变量并配置相关信息。
3. 部署项目到 Render。

## 贡献

欢迎贡献你的代码，以及提交问题和建议。请遵循贡献指南。

## 许可证

采用 [MIT licensed](LICENSE) 许可协议.
