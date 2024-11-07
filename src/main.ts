import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { getConfig, getEnv } from 'src/config';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from 'src/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'bff',
      rolling: true,
      cookie: { maxAge: 24 * 3600 * 1000 * 2 }, // 2 天
    }),
  );
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  const { port } = configService.get('server') as ServerConfig;
  logger.log(`端口号: ${port}`);
  logger.verbose(`RUNNING_ENV: ${getEnv()}`);
  logger.debug(`${JSON.stringify(getConfig())}`);

  await app.listen(port);
}
bootstrap();
