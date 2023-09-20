import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SpiderService } from '../spider/spider.service';
import { backDelHttpsUrl, backAddHttpsUrl } from '../../common/utils/utils';
@Injectable()
export class ToolInterfaceService {
  constructor(private spiderService: SpiderService) {}

  // 获取当前ip的网络信息
  async _getNetworkInfo(ipAddress) {
    // API解析IP信息
    const url = `https://api.ip.sb/geoip/${ipAddress}`;

    const fieldDefinitions = {
      organization: '组织名称',
      longitude: '经度值',
      city: '城市名称',
      timezone: '时区',
      isp: '互联网服务提供商',
      offset: '偏移值',
      region: '地区名称',
      asn: '自治系统号码 (ASN)',
      asn_organization: 'ASN组织名称',
      country: '国家名称',
      ip: 'IP地址',
      latitude: '纬度值',
      continent_code: '大洲代码',
      country_code: '国家代码',
      region_code: '地区代码',
    };

    // 数据处理
    const getData = (res) => {
      return {
        data: res.data,
        fieldDefinitions,
      };
    };

    const response = await axios.get(url);
    const data = getData(response);
    return data;
  }

  // 查询百度、谷歌、必应对网站的收录量
  async _getIncluded(siteUrl) {
    try {
      const baiduCount = await this.getBaiduIndexCount(siteUrl);
      const googleCount = await this.getGoogleIndexCount(siteUrl);
      const bingCount = await this.getBingIndexCount(siteUrl);

      return {
        baidu: baiduCount,
        google: googleCount,
        bing: bingCount,
      };
    } catch (error) {
      return `查询出错：${error.message}`;
    }
  }

  // 获取百度收录量
  async getBaiduIndexCount(siteUrl) {
    const url = `http://www.baidu.com/s?wd=site:${backDelHttpsUrl(siteUrl)}`;

    const resultStats = await this.spiderService.getContentBySelector(
      url,
      '#content_left .c-border.c-row.site_tip',
    );

    // 从字符串中提取收录数量
    const count = resultStats.match(/找到相关结果数约(\d+)个/);
    if (count && count.length > 1) {
      return count[1];
    } else {
      return 0;
    }
  }

  // 获取谷歌收录量
  async getGoogleIndexCount(siteUrl) {
    const url = `https://www.google.com/search?q=site:${backDelHttpsUrl(
      siteUrl,
    )}`;

    const resultStats = await this.spiderService.getContentBySelector(
      url,
      '#result-stats',
    );

    // 从字符串中提取收录数量
    const count =
      resultStats.match(/找到约 ([\d,]+) 条结果/) ||
      resultStats.match(/About ([\d,]+) results/);
    if (count && count.length > 1) {
      return count[1].replace(/,/g, '');
    } else {
      return 0;
    }
  }

  // 获取必应收录量
  async getBingIndexCount(siteUrl) {
    const url = `https://cn.bing.com/search?q=site:${backDelHttpsUrl(siteUrl)}`;

    const resultStats = await this.spiderService.getContentBySelector(
      url,
      '#b_tween',
    );

    // 从字符串中提取收录数量
    const count =
      resultStats.match(/([\d,]+) 条结果/) ||
      resultStats.match(/约 ([\d,]+) 个结果/) ||
      resultStats.match(/About ([\d,]+) resultsAny/);
    if (count && count.length > 1) {
      return count[1].replace(/,/g, '');
    } else {
      return 0;
    }
  }

  // 获取网站的信息
  async _getWebSiteInfo(siteUrl) {
    const resultStats = await this.spiderService.getPageMeta(
      backAddHttpsUrl(siteUrl),
    );
    return resultStats;
  }

  // 获取网站icon
  async _getWebSiteIcon(siteUrl, is_redirect = false) {
    const resultStats = await this.spiderService.getPageIcon(
      backAddHttpsUrl(siteUrl),
    );

    return JSON.parse(`${is_redirect}`)
      ? {
          type: 'redirect',
          data: resultStats,
        }
      : resultStats;
  }
}
