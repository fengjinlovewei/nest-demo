import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

import { RedisService } from 'src/redis/redis.service';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class UserService {
  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(SessionService)
  private sessionService: SessionService;

  async register(registerUserDto: RegisterUserDto) {
    const { username, password } = registerUserDto;

    console.log(typeof password);
    const notes = await this.redisService.hashGet(username);

    return notes;
  }

  async weather(city: string) {
    return await this.sessionService.weather(city);
  }
}
