import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { purchaseProviders } from './purchase.provider';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, ...purchaseProviders],
})
export class PurchaseModule {}
