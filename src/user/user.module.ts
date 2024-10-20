import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [SessionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
