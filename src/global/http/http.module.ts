import { Module, Global, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from './http.service';

import { AxiosModule } from 'src/global/axios/axios.module';
import { AxiosService } from 'src/global/axios/axios.service';
import { LoggerService } from 'src/global/logger/logger.service';

@Global()
@Module({
  imports: [AxiosModule],
  providers: [
    HttpService,
    {
      provide: 'HTTP',
      async useFactory(
        configService: ConfigService,
        axiosService: AxiosService,
        loggerService: LoggerService,
      ) {
        const config = configService.get('http') as HttpConfig;
        loggerService.debug(`${JSON.stringify(config)}`);

        const { baseURL, timeout } = config;

        return axiosService.init({
          baseURL,
          timeout,
          contentType: 'application/json;charset=UTF-8',
        });

        // const xform = axiosService.init({
        //   baseURL,
        //   timeout,
        //   contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        // });
      },
      inject: [ConfigService, AxiosService, LoggerService],
    },
  ],
  exports: [HttpService],
})
export class HttpModule {}
