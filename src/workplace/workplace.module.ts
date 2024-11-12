import { Module } from '@nestjs/common';
import { WorkplaceController } from './workplace.controller';
import { WorkplaceService } from './workplace.service';
import { workplaceProviders } from './workplace.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkplaceController],
  providers: [WorkplaceService, ...workplaceProviders],
})
export class WorkplaceModule {}
