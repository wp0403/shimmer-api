/*
 * @Descripttion: 日志记录拦截器,可以记录请求和响应日志
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-21 10:44:21
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-08-12 14:56:26
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { convertIPv6ToIPv4 } from '../utils/utils';

@Injectable()
export default class CustomLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const { method, originalUrl } = request;
    const forwardedIps = request.headers['x-forwarded-for'];
    // 解析真实 IP（如果有多个代理服务器，则可能是逗号分隔的列表）
    const clientIp = forwardedIps ? forwardedIps.split(',')[0] : request.connection.remoteAddress || convertIPv6ToIPv4(request.ip);
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - start;
        const status = response.statusCode;

        // 自定义日志格式
        const message = `请求方式：${method} | 请求路径：${originalUrl} | 耗时：${time}ms | 请求状态：${status} | 请求IP：${clientIp}`;

        console.log(message);
      }),
    );
  }
}
