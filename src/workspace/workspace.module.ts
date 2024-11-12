import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { workspaceProviders } from './workspace.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, ...workspaceProviders],
})
export class WorkspaceModule {}
