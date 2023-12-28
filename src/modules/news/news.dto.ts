export class BaiduDto {
  title: string;
  desc: string;
  pic: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class WeiboDto {
  title: string;
  desc: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class ToutiaoDto {
  id: string | number;
  title: string;
  pic: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class ZhihuDto {
  title: string;
  desc: string;
  pic: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class JuejinDto {
  id: string | number;
  title: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class ThepaperDto {
  id: string | number;
  title: string;
  pic: string;
  hot: number;
  time: string;
  url: string;
  mobileUrl: string;
}

export class KrDto {
  id: string | number;
  title: string;
  pic: string;
  owner: string;
  hot: number;
  data: {
    itemId: string | number;
    templateType: number;
    widgetImage: string;
    publishTime: number;
    widgetTitle: string;
    authorName: string;
    statRead: number;
    statCollect: number;
    statComment: number;
    statPraise: number;
    statFormat: string;
  };
  url: string;
  mobileUrl: string;
}

export class NetEaseDto {
  id: string | number;
  title: string;
  pic: string;
  owner: string;
  url: string;
  mobileUrl: string;
}

export class TencentDto {
  id: string | number;
  title: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class BilibiliDto {
  id: string | number;
  title: string;
  desc: string;
  pic: string;
  owner: {
    mid: string | number;
    name: string;
    face: string;
  };
  data: {
    [key: string]: number;
  };
  hot: number;
  url: string;
  mobileUrl: string;
}

export class SspaiDto {
  id: string | number;
  title: string;
  desc: string;
  pic: string;
  owner: {
    id: string | number;
    slug: string;
    avatar: string;
    nickname: string;
  };
  hot: number;
  url: string;
  mobileUrl: string;
}

export class DouyinDto {
  title: string;
  pic: string;
  hot: number;
  url: string;
  mobileUrl: string;
}

export class TieBaDto {
  id: string | number;
  title: string;
  desc: string;
  pic: string;
  hot: number | string;
  url: string;
  mobileUrl: string;
}

export class IThomeDto {
  title: string;
  pic: string;
  time: string;
  type: string;
  typeName: string;
  hot: number | string;
  url: string;
  mobileUrl: string;
}
