import type { Request as req, Response as res } from 'express';

declare global {
  interface SessionInfo {
    islogin: boolean;
  }

  interface Request extends req {
    XTransactionID: string;
  }

  interface Response extends res {}
  //服务配置
  interface ServerConfig {
    //主机地址,默认localhost
    host: string;
    //程序启动端口,默认3000
    port: number | string;
  }

  //redis配置
  interface RedisConfig {
    //是否启用,默认true
    enable: boolean;
    host: string;
    port: number;
    username: string;
    //是否需要验证，默认是false
    enableAuth: boolean;
    password: string;
    //默认是0
    db: number;
  }

  interface WinstonConfig {
    level: string;
    dirname: string;
    filename: string;
    datePattern: string;
    maxSize: string;
    maxFiles: string;
  }

  interface HttpConfig {
    //主机地址,默认localhost
    baseURL: string;
    //程序启动端口,默认3000
    timeout: number;
  }

  type contentType =
    | 'application/x-www-form-urlencoded;charset=UTF-8'
    | 'application/json;charset=UTF-8';

  interface AxiosConfig extends HttpConfig {
    contentType: contentType;
  }

  //应用配置
  interface AppConfig {
    //服务配置
    server: ServerConfig;
    redis: Partial<RedisConfig>;
    http: Partial<HttpConfig>;
  }
}

export {};
