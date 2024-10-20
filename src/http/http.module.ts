import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios from 'axios';

import { HttpService } from './http.service';

@Global()
@Module({
  providers: [
    HttpService,
    {
      provide: 'AXIOS',
      async useFactory(configService: ConfigService) {
        const timeout = configService.get('HTTP_TIMEOUT');
        const baseURL = configService.get('HTTP_BASE_URL');

        const axios = Axios.create({
          timeout,
          baseURL,
        });

        return axios;
      },
      inject: [ConfigService],
    },
  ],
  exports: [HttpService],
})
export class HttpModule {}
