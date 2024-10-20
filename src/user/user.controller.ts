import { Controller, Post, Get, Body, Param, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    // this.logger.log('ccc', AppController.name);

    this.logger.log(registerUserDto);

    return this.userService.register(registerUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
