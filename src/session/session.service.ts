import { Injectable, Inject, Logger } from '@nestjs/common';
import { CityDto } from './dto/city.dto';

import { HttpService } from 'src/http/http.service';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  @Inject(HttpService)
  private httpService: HttpService;

  async weather(city: string) {
    this.logger.log('city', city);

    const { data } = await this.httpService.get(
      `https://jsonplaceholder.typicode.com/posts`,
    );
    return data;
  }
}
