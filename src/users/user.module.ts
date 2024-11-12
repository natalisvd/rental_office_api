import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { UsersController } from './user.controller';

import { UsersService } from './user.service';

import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
