import { IsNotEmpty, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
export class CityDto {
  @IsNotEmpty({ message: '城市不能为空' })
  city: string;
}
