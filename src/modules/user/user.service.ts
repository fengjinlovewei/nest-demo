import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

import { RedisService } from 'src/global/redis/redis.service';
import { SessionService } from 'src/modules/session/session.service';

@Injectable()
export class UserService {
  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(SessionService)
  private sessionService: SessionService;

  private readonly logger = new Logger(UserService.name);

  async register(registerUserDto: RegisterUserDto) {
    const { username, password } = registerUserDto;

    this.logger.log(JSON.stringify({ ...registerUserDto }));

    const notes = await this.redisService.hashGet(username);

    return notes;
  }

  async header(data) {
    return { name: 'fdy' };
  }

  async weather(city: string) {
    return await this.sessionService.weather(city);
  }
}
