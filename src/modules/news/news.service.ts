import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class NewsService {
  async _getBaidu() {
    // 调用路径
    const url = 'https://top.baidu.com/board?tab=realtime';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      const dataList = [];
      try {
        const pattern = /<\!--s-data:(.*?)-->/s;
        const matchResult = data.match(pattern);
        const jsonObject = JSON.parse(matchResult[1]).cards[0].content;
        jsonObject.forEach((v) => {
          dataList.push({
            title: v.query,
            desc: v.desc,
            pic: v.img,
            hot: Number(v.hotScore),
            url: `https://www.baidu.com/s?wd=${encodeURIComponent(v.query)}`,
            mobileUrl: v.url,
          });
        });
        return dataList;
      } catch (error) {
        console.error('数据处理出错' + error);
        return false;
      }
    };

    const response = await axios.get(url);
    const data = getData(response.data);
    return data;
  }

  async _getWeibo() {
    // 调用路径
    const url = 'https://weibo.com/ajax/side/hotSearch';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      // return data;
      return data.map((v) => {
        const key = v.word_scheme ? v.word_scheme : `#${v.word}`;
        return {
          title: v.word,
          desc: key,
          hot: v.raw_hot,
          url: `https://s.weibo.com/weibo?q=${encodeURIComponent(
            key,
          )}&t=31&band_rank=1&Refer=top`,
          mobileUrl: `https://s.weibo.com/weibo?q=${encodeURIComponent(
            key,
          )}&t=31&band_rank=1&Refer=top`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data.realtime);
    return data;
  }

  async _getToutiao() {
    // 调用路径
    const url =
      'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.ClusterId,
          title: v.Title,
          pic: v.Image.url,
          hot: v.HotValue,
          url: `https://www.toutiao.com/trending/${v.ClusterIdStr}/`,
          mobileUrl: `https://api.toutiaoapi.com/feoffline/amos_land/new/html/main/index.html?topic_id=${v.ClusterIdStr}`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data);
    return data;
  }

  async _getZhihu() {
    // 调用路径
    const url = 'https://www.zhihu.com/hot';
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      const dataList = [];
      try {
        const pattern =
          /<script id="js-initialData" type="text\/json">(.*?)<\/script>/;
        const matchResult = data.match(pattern);
        const jsonObject = JSON.parse(matchResult[1]).initialState.topstory
          .hotList;
        jsonObject.forEach((v) => {
          dataList.push({
            title: v.target.titleArea.text,
            desc: v.target.excerptArea.text,
            pic: v.target.imageArea.url,
            hot:
              parseInt(v.target.metricsArea.text.replace(/[^\d]/g, '')) * 10000,
            url: v.target.link.url,
            mobileUrl: v.target.link.url,
          });
        });
        return dataList;
      } catch (error) {
        console.error('数据处理出错' + error);
        return false;
      }
    };

    const response = await axios.get(url, { headers });
    const data = getData(response.data);

    return data;
  }

  async _getJuejin() {
    // 调用路径
    const url =
      'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.content.content_id,
          title: v.content.title,
          hot: v.content_counter.hot_rank,
          url: `https://juejin.cn/post/${v.content.content_id}`,
          mobileUrl: `https://juejin.cn/post/${v.content.content_id}`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data);
    return data;
  }

  async _getThepaper() {
    // 调用路径
    const url = 'https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.contId,
          title: v.name,
          pic: v.pic,
          hot: v.praiseTimes,
          time: v.pubTime,
          url: `https://www.thepaper.cn/newsDetail_forward_${v.contId}`,
          mobileUrl: `https://m.thepaper.cn/newsDetail_forward_${v.contId}`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data.hotNews);
    return data;
  }

  async _getKr() {
    // 调用路径
    const url = 'https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.itemId,
          title: v.templateMaterial.widgetTitle,
          pic: v.templateMaterial.widgetImage,
          owner: v.templateMaterial.authorName,
          hot: v.templateMaterial.statRead,
          data: v.templateMaterial,
          url: `https://www.36kr.com/p/${v.itemId}`,
          mobileUrl: `https://www.36kr.com/p/${v.itemId}`,
        };
      });
    };

    const response = await axios.post(url, {
      partner_id: 'wap',
      param: {
        siteId: 1,
        platformId: 2,
      },
      timestamp: new Date().getTime(),
    });
    const data = getData(response.data.data.hotRankList);
    return data;
  }

  async _getNetEase() {
    // 调用路径
    const url = 'https://m.163.com/fe/api/hot/news/flow';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.skipID,
          title: v.title,
          desc: v._keyword,
          pic: v.imgsrc,
          owner: v.source,
          url: `https://www.163.com/dy/article/${v.skipID}.html`,
          mobileUrl: v.url,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data.list);
    return data;
  }

  async _getTencent() {
    // 调用路径
    const url = 'https://r.inews.qq.com/gw/event/hot_ranking_list?page_size=50';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.slice(1).map((v) => {
        return {
          id: v.id,
          title: v.title,
          desc: v.abstract,
          descSm: v.nlpAbstract,
          hot: v.readCount,
          pic: v.miniProShareImage,
          url: `https://new.qq.com/rain/a/${v.id}`,
          mobileUrl: `https://view.inews.qq.com/a/${v.id}`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.idlist[0].newslist);
    return data;
  }

  async _getBilibili() {
    // 调用路径
    const url = 'https://api.bilibili.com/x/web-interface/ranking/v2';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.bvid,
          title: v.title,
          desc: v.desc,
          pic: v.pic.replace(/http:/, 'https:'),
          owner: v.owner,
          data: v.stat,
          hot: v.stat.view,
          url: v.short_link_v2 || `https://b23.tv/${v.bvid}`,
          mobileUrl: `https://m.bilibili.com/video/${v.bvid}`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data.list);
    return data;
  }

  async _getSspai() {
    // 调用路径
    const url = `https://sspai.com/api/v1/article/tag/page/get?limit=40&tag=热门文章`;

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.id,
          title: v.title,
          desc: v.summary,
          pic: `https://cdn.sspai.com/${v.banner}`,
          owner: v.author,
          hot: v.like_count,
          url: `https://sspai.com/post/${v.id}`,
          mobileUrl: `https://sspai.com/post/${v.itemId}`,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data);
    return data;
  }

  async _getDouyin() {
    // 调用路径
    const url = 'https://aweme.snssdk.com/aweme/v1/hot/search/list/';
    const HEADERS = {
      'user-agent': 'okhttp3',
    };
    const QUERIES = {
      device_platform: 'android',
      version_name: '13.2.0',
      version_code: '130200',
      aid: '1128',
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      try {
        const jsonObject = data.data.word_list;
        return jsonObject.map((v) => {
          return {
            title: v.word,
            pic: `${v.word_cover.url_list[0]}`,
            hot: Number(v.hot_value),
            url: `https://www.douyin.com/hot/${encodeURIComponent(
              v.sentence_id,
            )}`,
            mobileUrl: `https://www.douyin.com/hot/${encodeURIComponent(
              v.sentence_id,
            )}`,
          };
        });
      } catch (error) {
        console.error('数据处理出错' + error);
        return [];
      }
    };

    const response = await axios.get(url, {
      headers: HEADERS,
      params: QUERIES,
    });
    const data = getData(response.data);
    return data;
  }

  async _getKuaiShou() {
    // 调用路径
    const url = 'https://www.kuaishou.com/?isHome=1';

    // Unicode 解码
    const decodedString = (encodedString) => {
      return encodedString.replace(/\\u([\d\w]{4})/gi, (match, grp) =>
        String.fromCharCode(parseInt(grp, 16)),
      );
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      const dataList = [];
      try {
        const pattern = /window.__APOLLO_STATE__=(.*);\(function\(\)/s;
        const idPattern = /clientCacheKey=([A-Za-z0-9]+)/s;
        const matchResult = data.match(pattern);
        const jsonObject = JSON.parse(matchResult[1])['defaultClient'];

        // 获取所有分类
        const allItems =
          jsonObject['$ROOT_QUERY.visionHotRank({"page":"home"})']['items'];
        // 遍历所有分类
        allItems.forEach((v) => {
          // 基础数据
          const image = jsonObject[v.id]['poster'];
          const id = image.match(idPattern)[1];
          // 数据处理
          dataList.push({
            title: jsonObject[v.id]['name'],
            pic: decodedString(image),
            hot: jsonObject[v.id]['hotValue'],
            url: `https://www.kuaishou.com/short-video/${id}`,
            mobileUrl: `https://www.kuaishou.com/short-video/${id}`,
          });
        });
        return dataList;
      } catch (error) {
        console.error('数据处理出错' + error);
        return false;
      }
    };

    const response = await axios.get(url);
    const data = getData(response.data);
    return data;
  }

  async _getTieBa() {
    // 调用路径
    const url = 'https://tieba.baidu.com/hottopic/browse/topicList';

    // 数据处理
    const getData = (data) => {
      if (!data) return [];
      return data.map((v) => {
        return {
          id: v.topic_id,
          title: v.topic_name,
          desc: v.topic_desc,
          pic: v.topic_pic,
          hot: v.discuss_num,
          url: v.topic_url,
          mobileUrl: v.topic_url,
        };
      });
    };

    const response = await axios.get(url);
    const data = getData(response.data.data.bang_topic.topic_list);
    return data;
  }

  async _getIThome() {
    // 调用路径
    const url = 'https://m.ithome.com/rankm/';
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    };

    // it之家特殊处理 - url
    const replaceLink = (url) => {
      const match = url.match(/[html|live]\/(\d+)\.htm/)[1];
      return `https://www.ithome.com/0/${match.slice(0, 3)}/${match.slice(
        3,
      )}.htm`;
    };

    // 数据处理
    const getData = (data) => {
      if (!data) return false;
      const dataList = [];
      const $ = cheerio.load(data);
      try {
        $('.rank-name').each(function () {
          const type = $(this).data('rank-type');
          const newListHtml = $(this).next('.rank-box').html();
          cheerio
            .load(newListHtml)('.placeholder')
            .get()
            .map((v) => {
              dataList.push({
                title: $(v).find('.plc-title').text(),
                pic: $(v).find('img').attr('data-original'),
                time: $(v).find('.post-time').text(),
                type: $(this).text(),
                typeName: type,
                hot: Number($(v).find('.review-num').text().replace(/\D/g, '')),
                url: replaceLink($(v).find('a').attr('href')),
                mobileUrl: $(v).find('a').attr('href'),
              });
            });
        });
        return dataList;
      } catch (error) {
        console.error('数据处理出错' + error);
        return false;
      }
    };

    const response = await axios.get(url, { headers });
    const data = getData(response.data);
    return data;
  }
}
