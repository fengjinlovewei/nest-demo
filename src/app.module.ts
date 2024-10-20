import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

import * as winston from 'winston';
import { WinstonLogger, WinstonModule, utilities } from 'nest-winston';

//import { HttpModule } from '@nestjs/axios';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    RedisModule,
    HttpModule,
    SessionModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    // HttpModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       timeout: configService.get('HTTP_TIMEOUT'),
    //       baseURL: configService.get('HTTP_BASE_URL'),
    //       // maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          level: 'debug',
          transports: [
            new winston.transports.File({
              filename: `${process.cwd()}/log`,
            }),
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(),
              ),
            }),
            // new winston.transports.Http({
            //   host: 'localhost',
            //   port: 3002,
            //   path: '/log'
            // })
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
