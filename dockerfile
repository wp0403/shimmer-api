# 设置基础镜像，推荐使用特定版本的 Node.js 镜像
FROM node:20.4.0

# 设置工作目录
WORKDIR /shimmer-api-app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN pnpm install

# 将整个项目复制到工作目录
COPY . .

# 构建应用程序
RUN npm run build

# 暴露应用程序使用的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "run", "start:prod"]
