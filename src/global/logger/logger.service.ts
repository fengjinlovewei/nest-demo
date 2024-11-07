import {
  Injectable,
  Inject,
  Scope,
  LoggerService as LService,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService {
  @Inject(REQUEST)
  private request: Request;

  @Inject(WINSTON_MODULE_NEST_PROVIDER)
  private logger: LService;

  private get getId() {
    return this.request?.XTransactionID ?? 'NULL';
  }

  log(message: string) {
    this.logger.log(message, this.getId);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace, this.getId);
  }

  warn(message: string) {
    this.logger.warn(message, this.getId);
  }

  debug(message: string) {
    this.logger.debug(message, this.getId);
  }

  verbose(message: string) {
    this.logger.verbose(message, this.getId);
  }
}
