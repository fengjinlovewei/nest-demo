import { env, cwd } from 'process';
import * as fs from 'fs';
import { parse } from 'yaml';
import * as path from 'path';

import { Logger } from '@nestjs/common';

export const logger = new Logger('src/config');

export const getEnv = () => (env as Record<string, any>).RUNNING_ENV as string;

export const isEnv = getEnv() === 'dev';

export function getConfig(): AppConfig {
  const environment = getEnv() ?? 'prod';

  logger.verbose(`RUNNING_ENV: ${environment}`);

  const yamlPath = path.join(cwd(), `./config.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf-8');
  const config = parse(file);

  logger.debug(`config: ${JSON.stringify(config)}`);

  return config;
}
