import { Module } from '@nestjs/common';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
})
export class AppModule {}
