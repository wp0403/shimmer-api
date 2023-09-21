/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-23 23:25:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-21 11:37:41
 */
import { Get, Controller, Req, Ip, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ToolInterfaceService } from './tool-interface.service';
import { NetworkInfo, Included, WebSite } from './tool-interface.dto';
import { convertIPv6ToIPv4 } from '../../common/utils/utils';
@Controller('tool')
@ApiTags('tool，工具')
export class ToolInterfaceController {
  constructor(private readonly toolInterfaceService: ToolInterfaceService) {}

  @Get('/parsing-ip')
  @ApiOperation({
    summary: '解析当前访问 ip 的信息',
    description: '解析当前访问 ip 的信息',
  })
  async getNetworkInfo(
    @Ip() ip: string,
    @Req() request,
  ): Promise<
    { data: NetworkInfo; fieldDefinitions: { [key: string]: string } } | string
  > {
    const forwardedIps = request.headers['x-forwarded-for'];
    // 解析真实 IP（如果有多个代理服务器，则可能是逗号分隔的列表）
    const ipAddress = forwardedIps
      ? forwardedIps.split(',')[0]
      : request.connection.remoteAddress || convertIPv6ToIPv4(ip);
    if (ipAddress === '127.0.0.1') return '127.0.0.1';
    return await this.toolInterfaceService._getNetworkInfo(ipAddress);
  }

  // 由于会触发搜索引擎的反爬虫机制，暂不提供该接口服务
  @Get('/included')
  @ApiOperation({
    summary: '查询当前链接收录',
    description: `<div style="background-color: yellow; padding: 10px;">
      <strong>注意：</strong>由于会触发搜索引擎的反爬虫机制，暂不提供该接口服务。
    </div>查询百度、谷歌、必应对网站的收录量`,
  })
  async getIncluded(@Query('url') url: string): Promise<Included | string> {
    return '由于会触发搜索引擎的反爬虫机制，暂不提供该接口服务';
    // return await this.toolInterfaceService._getIncluded(url);
  }

  @Get('/website-info')
  @ApiOperation({
    summary: '获取网站信息',
    description: '获取网站的title、desc、icon',
  })
  async getWebsiteInfo(@Query('url') url: string): Promise<WebSite | string> {
    return await this.toolInterfaceService._getWebSiteInfo(url);
  }

  @Get('/website-icon')
  @ApiOperation({
    summary: '获取网站icon',
    description: '获取网站的icon',
  })
  async getWebsiteIcon(
    @Query('is_redirect') is_redirect: boolean,
    @Query('url') url: string,
  ): Promise<{ type: string; data: string } | string> {
    return await this.toolInterfaceService._getWebSiteIcon(url, is_redirect);
  }

  // @Get('/translate')
  // @ApiOperation({
  //   summary: '文本翻译',
  //   description: '文本翻译',
  // })
  // async getTranslate(
  //   @Query('text') text: string,
  // ): Promise<{ type: string; data: string } | string> {
  //   return await this.toolInterfaceService._getTranslate(text);
  // }
}
