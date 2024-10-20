import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(RedisService)
  private redisService: RedisService;

  async register(registerUserDto: RegisterUserDto) {
    const { username, password } = registerUserDto;

    console.log(typeof password);
    const notes = await this.redisService.hashGet(username);

    return notes;
  }

  async findOne(id: number) {}
}
