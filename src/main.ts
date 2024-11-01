import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { getConfig, getEnv } from 'src/config';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.use(
    session({
      secret: 'bff',
      rolling: true,
      cookie: { maxAge: 24 * 3600 * 1000 * 2 }, // 2 天
    }),
  );
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalInterceptors(new InvokeRecordInterceptor());

  

  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  const { port } = configService.get('server') as ServerConfig;
  logger.log(`端口号: ${port}`);
  logger.verbose(`RUNNING_ENV: ${getEnv()}`);
  logger.debug(`${JSON.stringify(getConfig())}`);

  await app.listen(port);
}
bootstrap();
