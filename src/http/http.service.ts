import { Injectable, Inject, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);

  @Inject('AXIOS')
  private axios: AxiosInstance;

  async get(url: string) {
    return this.axios.get(url);
  }
}
