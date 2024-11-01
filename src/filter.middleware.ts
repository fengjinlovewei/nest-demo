import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FilterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('brefore');
    next();
    console.log('after');
  }
}
