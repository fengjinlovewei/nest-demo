import { env, cwd } from 'process';
import * as fs from 'fs';
import { parse } from 'yaml';
import * as path from 'path';

export const getEnv = () =>
  ((env as Record<string, any>).RUNNING_ENV as string) ?? 'prod';

export const isEnv = getEnv() === 'dev';

export function getConfig(): AppConfig {
  const yamlPath = path.join(cwd(), `./config.${getEnv()}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf-8');
  const config = parse(file);

  return config;
}
