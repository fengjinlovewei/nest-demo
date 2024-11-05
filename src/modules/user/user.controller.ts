import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Logger,
  Req,
  Res,
  Session,
} from '@nestjs/common';

import { UserService } from './user.service';
import type { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get('header')
  header(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // console.log(req.headers);
    // console.log(req.XTransactionID);
    // console.log(req.cookies);
    res.header('x-test-header', '5173');

    return { name: 'fdy' };
  }

  @Get('weather/:city')
  weather(@Req() req: Request, @Param('city') city: string) {
    return this.userService.weather(city);
  }

  @Get('login')
  login(@Session() session: SessionInfo) {
    session.islogin = true;
    return { islogin: 'ok' };
  }

  @Get('getSession')
  getSession(@Session() session: SessionInfo) {
    const islogin = session.islogin;
    return { islogin };
  }
}
