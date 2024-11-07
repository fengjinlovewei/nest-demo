import { v4 } from 'uuid';

export const uuid = () => v4();

export const isObj = (value) => typeof value === 'object' && value !== null;

export const getJsonLog = (Json: Record<string, any>) => {
  const list = Object.entries(Json).map(([key, value]) => {
    if (value === '') return key;
    return `${key}: ${isObj(value) ? JSON.stringify(value) : value}`;
  });

  const str = list.join(' - ');

  return str;
};
