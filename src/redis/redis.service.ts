import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  @Inject('REDIS')
  private redis: Redis;

  async hashGet(key: string) {
    return await this.redis.hgetall(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (let name in obj) {
      await this.redis.hset(key, name, obj[name]);
    }

    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }
}
