export class NetworkInfo {
  organization: string;
  longitude: number;
  city: string;
  timezone: string;
  isp: string;
  offset: number;
  region: string;
  asn: number;
  asn_organization: string;
  country: string;
  ip: string;
  latitude: number;
  continent_code: string;
  country_code: string;
  region_code: string;
}

export class Included {
  baidu: number | string;
  google: number | string;
  bing: number | string;
}

export class WebSite {
  title: string;
  description: string;
  icon: string;
}

