/*
 * @Descripttion: 统计接口请求次数的拦截器
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-24 10:45:28
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 16:16:22
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestStatistic } from './request-statistic.schema';

@Injectable()
export default class RequestStatisticsInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(RequestStatistic.name)
    private requestStatisticModel: Model<RequestStatistic>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const path = request.url;

    // 根据路径查找相应的记录，如果不存在则创建新记录
    return new Observable((observer) => {
      this.requestStatisticModel
        .findOneAndUpdate({ path }, { $inc: { count: 1 } }, { upsert: true })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    }).pipe(map(() => next.handle()));
  }
}
