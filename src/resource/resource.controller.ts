import { Public } from 'src/shared/public.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  @Get('/getmapinfo/:id')
  @Public()
  getMapInfo(@Param('id') id: string) {
    return this.resourceService.getMapInfo(id);
  }
}
