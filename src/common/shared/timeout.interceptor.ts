/*
 * @Descripttion: 请求超时拦截器
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-20 15:09:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-20 15:21:03
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export default class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeout: number = 20000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutContext = setTimeout(() => {
      throw TimeoutError;
    }, this.timeout);

    return next.handle().pipe(
      timeout(this.timeout),
      catchError((err) => {
        clearTimeout(timeoutContext);
        if (err instanceof TimeoutError) {
          return throwError(() => err);
        }
        return throwError(() => err);
      }),
    );
  }
}
