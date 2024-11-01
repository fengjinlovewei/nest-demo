import { Injectable, Inject, Logger } from '@nestjs/common';
import { AxiosInstance, AxiosHeaders } from 'axios';

interface commonType {
  url: string;
  headers?: AxiosHeaders;
}
interface getType extends commonType {
  params?: Record<string, any>;
}

interface postType extends commonType {
  data?: Record<string, any>;
}

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);

  @Inject('HTTP')
  private http: AxiosInstance

  async get({ url, params = {}, headers }: getType) {
    return this.http({
      method: 'GET',
      url,
      params,
      headers
    });
  }
  async post({ url, data = {}, headers }: postType) {
    return this.http({
      method: 'POST',
      url,
      data,
      headers
    });
  }
}
