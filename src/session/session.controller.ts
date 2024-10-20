import { Controller, Post, Get, Body, Param, Logger } from '@nestjs/common';
import { SessionService } from './session.service';
import { CityDto } from './dto/city.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly SessionService: SessionService) {}

  @Get(':city')
  weather(@Param('city') city: string) {
    console.log(city);
    return this.SessionService.weather(city);
  }
}
