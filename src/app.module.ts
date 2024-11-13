import { Module } from '@nestjs/common';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { OfficeModule } from './office/office.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ResourceModule } from './resource/resource.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    OfficeModule,
    WorkspaceModule,
    PurchaseModule,
    ResourceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
  ],
})
export class AppModule {}
