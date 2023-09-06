import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('接口首页')
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: '接口首页', description: '接口首页' })
  handleAllRequests() {
    return 'home';
  }
}
