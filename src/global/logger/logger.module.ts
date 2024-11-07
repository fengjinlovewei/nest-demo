import { Global, Module, Logger } from '@nestjs/common';

import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';

import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/global/logger/logger.service';

import 'winston-daily-rotate-file';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        // console.log('111', configService.get('rides'));

        const logger = new Logger('WinstonConfig');
        const winstonConfig = configService.get('winston') as WinstonConfig;
        logger.debug(`${JSON.stringify(winstonConfig)}`);

        const { level, dirname, filename, datePattern, maxSize, maxFiles } =
          winstonConfig;

        return {
          level: 'debug',
          transports: [
            // new winston.transports.File({
            //   filename: `${process.cwd()}/log`,
            // }),
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(),
              ),
            }),
            new winston.transports.DailyRotateFile({
              level,
              dirname,
              filename,
              datePattern,
              maxSize,
              maxFiles, // 最多保存多少天
              zippedArchive: true, // 压缩
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
              ),
            }),
            new winston.transports.DailyRotateFile({
              level: 'error',
              dirname,
              filename: `error-${filename}`,
              datePattern,
              maxSize,
              maxFiles,
              zippedArchive: true,
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
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
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
