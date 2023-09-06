/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 23:25:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-29 00:43:47
 */
import { Get, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDecorationService } from './page-decoration.service';
import { ReturnDto } from './page-decoration.dto';

@Controller('page-decoration')
@ApiTags('PageDecoration，页面装饰')
export class PageDecorationController {
  constructor(private readonly pageDecorationService: PageDecorationService) { }

  @Get('/snow')
  @ApiOperation({
    summary: '获取雪花代码',
    description: '获取雪花代码',
  })
  async getSnow(): Promise<ReturnDto | false> {
    return await this.pageDecorationService._getSnow();
  }

  @Get('/cherry-blossom')
  @ApiOperation({
    summary: '获取樱花代码',
    description: '获取樱花代码',
  })
  async getCherryBlossom(): Promise<ReturnDto | false> {
    return await this.pageDecorationService._getCherryBlossom();
  }

  @Get('/wave')
  @ApiOperation({
    summary: '获取波浪代码',
    description: '获取波浪代码',
  })
  async getWave(): Promise<ReturnDto | false> {
    return await this.pageDecorationService._getWave();
  }
}
