import { Injectable, Inject, Scope } from '@nestjs/common';
import Axios from 'axios';
import { REQUEST } from '@nestjs/core';
import { getJsonLog } from 'src/utils';

import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { LoggerService } from 'src/global/logger/logger.service';

@Injectable({ scope: Scope.REQUEST })
export class AxiosService {
  @Inject(REQUEST)
  private request: Request;

  @Inject(LoggerService)
  private logger: LoggerService;

  getLogStr = (
    title: string,
    config: InternalAxiosRequestConfig<any>,
    other?: Record<string, any>,
  ) => {
    const { method, url, params, data } = config;

    return getJsonLog({
      [title]: '',
      [method]: '',
      [url]: '',
      params,
      body: data,
      data: other,
    });
  };

  reqSuccess = (config: InternalAxiosRequestConfig<any>) => {
    this.logger.log(this.getLogStr('[TO:SERVER] Success-1', config));
    return config;
  };

  reqError = (error: any) => {
    this.logger.error(`[TO:SERVER] Error-1 ${JSON.parse(error)}`);
    return Promise.reject(error);
  };

  resSuccess = (res: AxiosResponse<any, any>) => {
    // debugger;
    const status = res.status;
    if ((status >= 200 && status < 300) || status === 304) {
      //   if (res.data.code !== 200) {
      //     this.logger.error(JSON.stringify(res.data));

      //     return Promise.reject(res);
      //   }
      this.logger.log(
        this.getLogStr('[FROM:SERVER] Success-2', res.config, res.data),
      );
      return res;
    }

    this.logger.error(this.getLogStr('[FROM:SERVER] Error-2', res.config, res));

    return Promise.reject(res);
  };

  resError = (error: any) => {
    this.logger.error(
      this.getLogStr('[FROM:SERVER] Error-3', error.config, error),
    );

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
