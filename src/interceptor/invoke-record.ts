import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Scope,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { uuid, getJsonLog } from 'src/utils';

import { LoggerService } from 'src/global/logger/logger.service';

@Injectable({ scope: Scope.REQUEST })
export class InvokeRecordInterceptor implements NestInterceptor {
  @Inject(LoggerService)
  private logger: LoggerService;

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const XTransactionID = uuid();

    request.XTransactionID = XTransactionID;

    const userAgent = request.headers['user-agent'];

    const { ip, method, path, params, body } = request;

    this.logger.debug(
      getJsonLog({
        '[REQ:BFF]': '',
        [method]: '',
        [path]: '',
        params,
        body,
        ip,
        userAgent,
        className: context.getClass().name,
        handleName: context.getHandler().name,
      }),
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        // res 是最终返回的数据实体。不包含状态码，
        this.logger.debug(
          getJsonLog({
            '[RES:BFF]': '',
            [method]: '',
            [path]: '',
            params,
            body,
            ip,
            userAgent,
            statusCode: response.statusCode,
            time: `${Date.now() - now}ms`,
            Response: res,
          }),
        );
      }),
    );
  }
}
