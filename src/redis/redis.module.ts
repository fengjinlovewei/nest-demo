import { Global, Module, Logger, LoggerService } from '@nestjs/common';
import Redis from 'ioredis';

import { ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';

import { WinstonLogger, WinstonModule, utilities } from 'nest-winston';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS',
      async useFactory(configService: ConfigService) {
        const logger = new Logger('RedisConfig');
        const config = configService.get('redis') as RedisConfig;

        logger.debug(`${JSON.stringify(config)}`);

        const redis = new (class {})(); //Redis(config);

        return redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
