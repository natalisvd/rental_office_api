import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';

import { UsersService } from './user.service';

import User from './user.schema';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
