import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Logger,
  Req,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CityDto } from './dto/city.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly SessionService: SessionService) {}

  @Get(':city')
  weather(@Req() req: Request, @Param('city') city: string) {
    return this.SessionService.weather(city, req.XHeaderId);
  }
}
