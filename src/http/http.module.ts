import { Module, Global, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from './http.service';

import { AxiosModule} from 'src/axios/axios.module';
import { AxiosService} from 'src/axios/axios.service';

@Global()
@Module({
  imports: [AxiosModule],
  providers: [
    HttpService,
    {
      provide: 'HTTP',
      async useFactory(configService: ConfigService, axiosService: AxiosService) {
        const logger = new Logger('HttpConfig');
        const config = configService.get('http') as HttpConfig;
        logger.debug(`${JSON.stringify(config)}`);

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
      inject: [ConfigService, AxiosService],
    },
  ],
  exports: [HttpService],
})
export class HttpModule {}
