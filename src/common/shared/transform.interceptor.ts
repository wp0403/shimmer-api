/*
 * @Descripttion: 响应转换拦截器
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-20 15:09:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-25 17:17:06
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'date-fns';

type DataObj = string | boolean | number | any[];
interface Obj {
  type?: 'redirect' | 'script';
  mete?: {
    page?: number | string;
    page_size?: number | string;
    total?: number | string;
    [key: string]: number | string;
  };
  data: DataObj;
  contentType?: string;
}

type Data = DataObj & Obj;

@Injectable()
export default class TransformInterceptor implements NestInterceptor {
  private readonly htmlFilePath: string;
  private readonly htmlContent: string;

  constructor() {
    this.htmlFilePath = resolve('public/index.html');
    this.htmlContent = readFileSync(this.htmlFilePath, 'utf-8');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 将返回的结果抛出
    const ctx = context.switchToHttp();
    // const request = ctx.getRequest();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((data: Data) => {
        // 在这里实现你的响应转换处理
        if (data === 'home') {
          response.set('Content-Type', 'text/html');
          return this.htmlContent;
        } else if (data.type && data.type === 'redirect') {
          response.statusCode = 302;
          response.header('Location', data.data);
          return data.data;
        } else if (data.type && data.type === 'script') {
          response.header('Content-Type', 'application/javascript');
          return data.data;
        } else {
          return {
            code: response.statusCode,
            msg: '请求成功！',
            data,
            timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          };
        }
      }),
    );
  }
}
