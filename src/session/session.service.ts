import { Injectable, Inject, Logger } from '@nestjs/common';
import { CityDto } from './dto/city.dto';

import { HttpService } from 'src/http/http.service';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  @Inject(HttpService)
  private httpService: HttpService;

  async weather(city: string) {
    const { data } = await this.httpService.get({
      url: `https://jsonplaceholder.typicode.com/posts`,
      params: { dd: '11', fff: '222' },
    });
    return data;
  }
}
