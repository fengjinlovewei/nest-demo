import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS',
      async useFactory() {
        const redis = new Redis({
          port: 6379, // Redis port
          host: '127.0.0.1', // Redis host
          username: 'default', // needs Redis >= 6
          password: '522123',
          db: 0, // Defaults to 0
        });
        return redis;
      }
    }
  ],
  exports: [RedisService]
})
export class RedisModule {}
