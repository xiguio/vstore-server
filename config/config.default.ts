import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & IBizConfig>;

// app special config scheme
export interface IBizConfig {
  sourceUrl: string;
  apiPrefix: string;
  sequelize: {
    dialect: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    // 数据库表名前缀
    tablePrefix: string;
  };
  // jwt 会话设置
  jwtSession: {
    enable: boolean;
    match: RegExp[];
    // 设置token 的http header name
    tokenHeader: string;
    // jwt 的加密字符串
    secret: string;
  };
  // wechat 设置
  wechat: {
    appid: string;
    // 小程序密钥
    secret: string;
    // 商户帐号ID
    mch_id: string;
    // 微信支付密钥
    partner_key: string;
    // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
    notify_url: string;
  };
  // qq 设置
  qq: {
    appid: string;
    // 小程序密钥
    secret: string;
  };
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & IBizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606028877345_1508';

  // 微信配置
  config.wechat = {
    appid: 'your wechat mp appid',
    secret: 'your wechat mp app secret',
    mch_id: '',
    partner_key: '',
    notify_url: '',
  };

  // QQ小程序配置
  config.qq = {
    appid: 'your qq mp appid',
    secret: 'your qq mp app secret',
  };

  // add your config here
  config.middleware = [
    'jwtSession',
    'responseHandler',
  ];

  // 为中间件过滤请求
  config.responseHandler = {
    enable: true,
    match: [
      /\/api\//,
    ],
  };

  // 为jwt中间件设置config
  config.jwtSession = {
    enable: true,
    match: [
      /\/api\//,
    ],
    tokenHeader: 'X-VStore-Token',
    secret: 'your secret',
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'vstore',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'TAMMENY',
    tablePrefix: '',
  };

  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      keyPrefix: 'vstore:',
      db: 0,
    }
  };

  config.apiPrefix = '/api';
  return config;
};
