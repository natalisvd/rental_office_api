import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { DatabaseModule } from 'src/database/database.module';
import { officeProviders } from './office.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OfficeController],
  providers: [OfficeService, ...officeProviders],
})
export class OfficeModule {}
