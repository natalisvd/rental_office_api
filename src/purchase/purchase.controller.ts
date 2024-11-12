import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICustomRequest } from 'src/shared';
import { PurchaseService } from './purchase.service';
import { IPurchase } from './purchase.types';

@Controller('purchase')
@ApiTags('Purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('/')
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.purchaseService.findById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.purchaseService.delete(id);
  }

  @Post('/')
  create(@Body() createOfficeDto: Partial<IPurchase>) {
    return this.purchaseService.create(createOfficeDto);
  }

  @Patch('/')
  patch(
    @Body() updatePurchaseDto: Partial<IPurchase>,
    @Req() req: ICustomRequest,
  ) {
    return this.purchaseService.patch(updatePurchaseDto, req.user._id);
  }
}
