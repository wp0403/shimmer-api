/*
 * @Descripttion: 角色拦截器，基于角色的访问控制
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-21 10:44:21
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-21 15:12:22
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class RolesInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取到控制器方法上附加的角色权限
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      // 如果没有指定角色权限，直接通过拦截器
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !roles.some((role) => user.roles.includes(role))) {
      throw new UnauthorizedException("You don't have permission");
    }

    return next.handle();
  }
}
