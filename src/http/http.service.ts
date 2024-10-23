import { Injectable, Inject, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';

interface getType {
  url: string;
  params?: any;
  XHeaderId: string;
}

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);

  @Inject('HTTP')
  private http: AxiosInstance;

  async get({ url, params, XHeaderId }: getType) {
    return this.http({
      method: 'GET',
      url,
      headers: {
        'x-header-id': XHeaderId,
      },
      params,
    });
  }
}
