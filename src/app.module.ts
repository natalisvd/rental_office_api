import { Module } from '@nestjs/common';

import { config } from './config';

import { join } from 'path';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: config.DIALECT as Dialect,
      host: config.HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [join(__dirname, '**', '*.schema.{ts,js}')],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
