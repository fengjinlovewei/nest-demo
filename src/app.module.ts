import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

import * as winston from 'winston';
import { WinstonLogger, WinstonModule, utilities } from 'nest-winston';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from './http/http.module';

import { getConfig } from 'src/config';

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
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        // console.log('111', configService.get('rides'));
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
