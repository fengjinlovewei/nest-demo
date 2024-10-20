import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

import { ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS',
      async useFactory(configService: ConfigService) {
        const port = configService.get('redis_server_port');
        const host = configService.get('redis_server_host');
        const username = configService.get('redis_server_username');
        const password = configService.get('redis_server_password');
        const db = configService.get('redis_server_db');

        const redis = new Redis({
          port,
          host,
          username,
          password,
          db,
        });

        return redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
