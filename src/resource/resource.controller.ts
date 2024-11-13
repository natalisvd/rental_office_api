import { Public } from 'src/shared/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  @Get('/getmapinfo')
  @Public()
  getMapInfo() {
    return this.resourceService.getMapInfo();
  }
}
