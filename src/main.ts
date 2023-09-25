import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 允许来自所有源的请求
  app.enableCors();

  // 创建 Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('shimmer接口站')
    .setDescription('使用nestJS作为后端框架，整合常用api集合')
    .setVersion('1.0')
    .build();
  // 创建 SwaggerSpec
  const swaggerSpec = SwaggerModule.createDocument(app, config);

  // 设置 Swagger UI 路由
  SwaggerModule.setup('swagger', app, swaggerSpec);

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() =>
  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`)
);
