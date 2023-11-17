import { Injectable } from '@nestjs/common';
// import puppeteer from 'puppeteer'
import axios from 'axios';
import cheerio from 'cheerio';
import { processUrl } from '../../common/utils/utils';

@Injectable()
export class SpiderService {
  async launchHeadlessChrome() {
    // const browser = await puppeteer.launch();
    // return browser;
  }

  // 获取页面所有的内容
  // async crawlPage(url) {
  //   const browser = await this.launchHeadlessChrome();
  //   const page = await browser.newPage();
  //   await page.setViewport({ width: 1440, height: 900 });
  //   await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  //   const html = await page.content();
  //   await browser.close();
  //   return html;
  // }

  // 获取页面所有的内容
  async crawlPage(url) {
    const res = await axios.get(`${process.env.SPIDER_URL}?url=${url}`);
    return res.data;
  }

  // 获取特定类名或者id名下面的所有内容
  async getContentBySelector(url, selector) {
    const html = await this.crawlPage(url);
    const $ = cheerio.load(html);
    const content = $(selector).text();
    return content;
  }

  // 获取页面中所有图片的链接
  async getImgSrcList(url) {
    const html = await this.crawlPage(url);
    const $ = cheerio.load(html);
    const srcList = $('img')
      .map((i, el) => $(el).attr('src'))
      .get();
    return srcList;
  }

  // 从HTML中正则提取<title>标签内容
  async getPageTitle(url) {
    const html = await this.crawlPage(url);
    // 使用 cheerio.load() 方法加载 HTML 字符串
    const $ = cheerio.load(html);
    // 使用类似 jQuery 的选择器语法找到 link 元素
    const titleElement = $('title').first();
    return titleElement.text();
  }

  // 从HTML中获取meta name="description" content
  async getMetaDescription(url) {
    const html = await this.crawlPage(url);
    // 使用 cheerio.load() 方法加载 HTML 字符串
    const $ = cheerio.load(html);
    // 使用类似 jQuery 的选择器语法找到 link 元素
    const descElement = $('meta[name="description"]').first();
    const description = descElement.attr('content');
    return description;
  }

  // 提取网页中icon link标签的href作为图标
  async getPageIcon(url) {
    const html = await this.crawlPage(url);
    // 使用 cheerio.load() 方法加载 HTML 字符串
    const $ = cheerio.load(html);
    // 使用类似 jQuery 的选择器语法找到 link 元素
    const iconLinkElement = $('link[rel="icon"]').first();
    let icon = iconLinkElement.attr('href') || '🌍';
    icon = icon && processUrl(icon) ? icon : `${url}${icon}`;
    return icon;
  }

  // 获取页面标题、描述、图标
  async getPageMeta(url) {
    const html = await this.crawlPage(url);
    // 使用 cheerio.load() 方法加载 HTML 字符串
    const $ = cheerio.load(html);
    // 使用类似 jQuery 的选择器语法找到 link 元素
    const iconLinkElement = $('link[rel="icon"]').first();
    const titleElement = $('title').first();
    const descElement = $('meta[name="description"]').first();

    let title = titleElement.text();
    let description = descElement.attr('content');
    let icon = iconLinkElement.attr('href') || '🌍';
    icon = icon && processUrl(icon) ? icon : `${url}${icon}`;

    return {
      title,
      description,
      icon: icon || '🌍',
    };
  }
}
