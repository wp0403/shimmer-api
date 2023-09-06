import { CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomLoggingInterceptor,
  CacheInterceptor,
  AllExceptionsFilter,
  RolesInterceptor,
  TransformInterceptor,
  RequestStatisticsInterceptor,
} from '@shared';
import { cacheConfigDecorator } from '@decorator';
import { AppController } from './app.controller';
import { NewsModule } from './modules/news/news.module';
import { MusicModule } from './modules/music/music.module';
import { PictureModule } from './modules/picture/picture.module';
import { PageDecorationModule } from './modules/page-decoration/page-decoration.module';
import { ToolInterfaceModule } from './modules/tool-interface/tool-interface.module'
import {
  RequestStatistic,
  RequestStatisticSchema,
} from './common/shared/request-statistic.schema';
import { SpiderService } from './modules/spider/spider.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost:27017/nestjs_app'), // 替换为你的 MongoDB 连接字符串
    // MongooseModule.forFeature([{ name: RequestStatistic.name, schema: RequestStatisticSchema }]),
    CacheModule.register(),
    NewsModule,
    MusicModule,
    PictureModule,
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
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RequestStatisticsInterceptor, // 记录接口请求次数
    // },
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
