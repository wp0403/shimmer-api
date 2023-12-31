import { CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  CustomLoggingInterceptor,
  CacheInterceptor,
  AllExceptionsFilter,
  RolesInterceptor,
  TransformInterceptor,
} from '@shared';
import { cacheConfigDecorator } from '@decorator';
import { AppController } from './app.controller';
import { NewsModule } from './modules/news/news.module';
import { MusicModule } from './modules/music/music.module';
import { PictureModule } from './modules/picture/picture.module';
import { MoviesModule } from './modules/movies/movies.module';
import { PageDecorationModule } from './modules/page-decoration/page-decoration.module';
import { ToolInterfaceModule } from './modules/tool-interface/tool-interface.module';
import { SpiderService } from './modules/spider/spider.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    NewsModule,
    MusicModule,
    PictureModule,
    MoviesModule,
    PageDecorationModule,
    ToolInterfaceModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: cacheConfigDecorator.CACHE_CONFIG_KEY,
      useValue: cacheConfigDecorator.CacheConfig, // 自定义装饰器cache的配置
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomLoggingInterceptor, // 全局请求日志记录拦截器
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor, // 缓存拦截器,可以实现响应缓存
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // 全局异常过滤器
    },
    {
      provide: APP_GUARD,
      useClass: RolesInterceptor, // 全局身份验证守卫
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor, // 全局转换拦截器
    },
    SpiderService,
  ],
})
export class AppModule {}
