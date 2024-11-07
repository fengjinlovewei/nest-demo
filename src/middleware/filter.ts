import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { LoggerService } from 'src/global/logger/logger.service';

import { uuid, getJsonLog } from 'src/utils';

@Injectable()
export class FilterMiddleware implements NestMiddleware {
  @Inject(LoggerService)
  private logger: LoggerService;

  use(request: Request, response: Response, next: () => void) {
    console.log('brefore');

    // const XTransactionID = uuid();

    // request.XTransactionID = XTransactionID;

    // const userAgent = request.headers['user-agent'];

    // const { ip, method, path, params, body } = request;

    // this.logger.debug(
    //   getJsonLog({
    //     '[REQ:BFF]': '',
    //     XTransactionID,
    //     method,
    //     path,
    //     params,
    //     body,
    //     ip,
    //     userAgent,
    //   }),
    // );

    // this.logger.debug('logger1');

    response.on('finish', (...arg) => {
      // debugger;
      // 记录结束时间
      //   this.logger.debug('logger2');
      //   console.log(arg, response);
    });

    next();
    console.log('after');
  }
}
