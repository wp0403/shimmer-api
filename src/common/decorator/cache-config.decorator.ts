/*
 * @Descripttion: 禁止缓存装饰器，使用后，可以禁止接口被缓存
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 22:56:57
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 00:46:20
 */
import { SetMetadata } from '@nestjs/common';

export const CACHE_CONFIG_KEY = 'cache_config';

export interface CacheConfigType {
  flag?: boolean;
  duration?: number;
}

export const CacheConfig = (obj?: CacheConfigType) =>
  SetMetadata(CACHE_CONFIG_KEY, obj);
