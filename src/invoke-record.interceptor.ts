import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { uuid, getJsonLog } from './utils';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const XHeaderId = uuid();

    request.XHeaderId = XHeaderId;

    const userAgent = request.headers['user-agent'];

    const { ip, method, path, params, body } = request;

    this.logger.debug(
      getJsonLog({
        '[REQ:BFF]': '',
        XHeaderId,
        method,
        path,
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
            XHeaderId,
            method,
            path,
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
