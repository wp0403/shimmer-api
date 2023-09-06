/*
 * @Descripttion: 缓存拦截器
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 22:45:23
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-08-31 15:37:50
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cacheConfigDecorator } from '@decorator';

interface CacheItem {
  data: any;
  expiresAt: Date;
}

@Injectable()
export default class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, CacheItem>();

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const cacheItem = this.cache.get(url);

    // 默认都缓存
    let shouldCache = true;
    const defaultCacheConfig = { flag: true, duration: 60 };

    // 获取cacheConfig装饰器的参数
    const cacheConfig: cacheConfigDecorator.CacheConfigType = {
      ...defaultCacheConfig,
      ...(this.reflectNoCache(context.getHandler()) || {}),
    };

    if (cacheConfig && !cacheConfig.flag) {
      shouldCache = false;
    }

    if (shouldCache && cacheItem && cacheItem.expiresAt > new Date()) {
      // 命中缓存,直接返回缓存数据
      return of(cacheItem.data);
    }

    // 缓存失效或未命中,发出请求
    return next.handle().pipe(
      tap((data) => {
        // 获取响应数据后更新缓存
        const expiresAt = new Date(Date.now() + cacheConfig.duration * 1000);
        // 判断需要缓存再设置
        if (cacheConfig.flag && data.code === 200) {
          this.cache.set(url, { data, expiresAt });
        }
      }),
    );
  }
  reflectNoCache(handler) {
    return Reflect.getMetadata(cacheConfigDecorator.CACHE_CONFIG_KEY, handler);
  }
}
