import { IsNotEmpty, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
export class RegisterUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  // @Type(() => Number)
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码最少 6 位' })
  password: string;

  @IsNotEmpty({ message: 'type不能为空' })
  type: number;

  isBool: boolean;
}
