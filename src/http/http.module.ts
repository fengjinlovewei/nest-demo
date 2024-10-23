import { Module, Global, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AxiosInit } from './axios.config';
import { HttpService } from './http.service';

@Global()
@Module({
  providers: [
    HttpService,
    {
      provide: 'HTTP',
      async useFactory(configService: ConfigService) {
        const logger = new Logger('httpModule');
        const config = configService.get('http') as HttpConfig;
        logger.debug(`httpConfig: ${JSON.stringify(config)}`);

        const { baseURL, timeout } = config;

        const http = new AxiosInit();

        const axiosJson = http.init({
          baseURL,
          timeout,
          contentType: 'application/json;charset=UTF-8',
        });

        return axiosJson;
      },
      inject: [ConfigService],
    },
  ],
  exports: [HttpService],
})
export class HttpModule {}
