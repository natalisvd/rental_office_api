import { Module } from '@nestjs/common';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { OfficeModule } from './office/office.module';
import { WorkplaceModule } from './workplace/workplace.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, OfficeModule, WorkplaceModule],
})
export class AppModule {}
