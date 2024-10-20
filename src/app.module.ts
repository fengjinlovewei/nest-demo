import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RedisModule, SessionModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
