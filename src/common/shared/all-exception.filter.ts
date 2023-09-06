/*
 * @Descripttion: 异常过滤器
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-21 10:44:21
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-24 14:55:02
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { format } from 'date-fns';

interface ErrorResponse {
  message: string; // 错误信息
  code: number; // 错误代码
  timestamp: string; // 发生时间
  path?: string; // 请求路径
  info?: any; // 其他信息
}

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ErrorResponse = {
      code: status,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      path: request.url,
      message: '',
    };

    if (exception instanceof HttpException) {
      const errorRes: any = exception.getResponse();
      // 处理 HttpException
      errorResponse.message = errorRes?.error || errorRes;
    } else {
      // 处理其他异常
      errorResponse.message = '服务器发生错误，请联系管理员';
      console.log(
        '\x1b[31m%s\x1b[0m',
        `错误识别码：${errorResponse.code} | 错误路径：${errorResponse.path} | 错误时间：${errorResponse.timestamp} | 错误信息：${exception}`,
      );
    }

    response.status(errorResponse.code).json(errorResponse);
  }
}
