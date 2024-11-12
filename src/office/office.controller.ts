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
import { OfficeService } from './office.service';
import { ICustomRequest } from 'src/shared';
import { IOffice } from './office.types';

@Controller('office')
@ApiTags('Office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get('/')
  findAll() {
    return this.officeService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.officeService.findById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.officeService.delete(id);
  }

  @Post('/')
  create(@Body() createOfficeDto: Partial<IOffice>) {
    return this.officeService.create(createOfficeDto);
  }

  @Patch('/')
  patch(@Body() updateOfficeDto: Partial<IOffice>, @Req() req: ICustomRequest) {
    return this.officeService.patch(updateOfficeDto, req.user._id);
  }
}
