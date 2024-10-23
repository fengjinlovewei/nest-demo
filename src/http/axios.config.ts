import { Logger } from '@nestjs/common';
import Axios from 'axios';
import { getJsonLog } from 'src/utils';

import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosInit {
  private readonly logger = new Logger(AxiosInit.name);

  constructor() {}

  getLogStr = (title: string, config: InternalAxiosRequestConfig<any>) => {
    const { method, url, headers, params, data } = config;

    const XHeaderId = headers['x-header-id'];

    return getJsonLog({ [title]: '', XHeaderId, method, url, params, data });
  };

  reqSuccess = (config: InternalAxiosRequestConfig<any>) => {
    this.logger.log(this.getLogStr('[REQ:SERVER] Success', config));
    return config;
  };

  reqError = (error: any) => {
    this.logger.error(this.getLogStr('[REQ:SERVER] Error', error.config));
    this.logger.error(`reqError - ${JSON.parse(error)}`);
    return Promise.reject(error);
  };

  resSuccess = (res: AxiosResponse<any, any>) => {
    // debugger;
    const status = res.status;
    this.logger.log(this.getLogStr('[RES:SERVER] Success', res.config));

    if ((status >= 200 && status < 300) || status === 304) {
      //   if (res.data.code !== 200) {
      //     this.logger.error(JSON.stringify(res.data));

      //     return Promise.reject(res);
      //   }
      this.logger.log(`[RES:SERVER] Success - ${JSON.stringify(res.data)}`);
      return res;
    }

    this.logger.error(`[RES:SERVER] Success - Error - ${JSON.stringify(res)}`);

    return Promise.reject(res);
  };

  resError = (error: any) => {
    this.logger.error(this.getLogStr('[RES:SERVER] Error', error.config));

    this.logger.error('[RES:SERVER] Error', error);

    // const status = error.response.status;
    // if (status === 401 || status === 400) {
    //   console.log('token失效');
    // }
    // if (status === 403) {
    //   console.log('您没有权限');
    // }
    return Promise.reject(error.response.data);
  };

  init = (axiosConfig: AxiosConfig) => {
    const { baseURL, timeout, contentType } = axiosConfig;
    const axios = Axios.create({
      //withCredentials: true,
      //crossDomain: true,
      baseURL,
      timeout,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      },
    });

    axios.interceptors.request.use(this.reqSuccess, this.reqError);

    // code状态码拦截
    axios.interceptors.response.use(this.resSuccess, this.resError);

    return axios;
  };
}
