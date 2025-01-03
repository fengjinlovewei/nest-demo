import {
  Module,
  Logger,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RedisModule } from 'src/global/redis/redis.module';
import { HttpModule } from 'src/global/http/http.module';
import { LoggerModule } from 'src/global/logger/logger.module';

import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

import { FilterMiddleware } from 'src/middleware/filter';
import { LoginMiddleware } from 'src/middleware/login';

import * as winston from 'winston';
import { WinstonLogger, WinstonModule, utilities } from 'nest-winston';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { getConfig } from 'src/config';

import { APP_INTERCEPTOR } from '@nestjs/core';

import { InvokeRecordInterceptor } from 'src/interceptor/invoke-record';
import { FormatResponseInterceptor } from 'src/interceptor/format-response';

@Module({
  imports: [
    RedisModule,
    HttpModule,
    SessionModule,
    UserModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [getConfig],
      // envFilePath: 'src/.env',
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: InvokeRecordInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilterMiddleware).forRoutes('*');
    consumer
      .apply(LoginMiddleware)
      .forRoutes({ path: 'world2', method: RequestMethod.GET });
  }
}
