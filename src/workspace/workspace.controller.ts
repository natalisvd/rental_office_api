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
import { WorkspaceService } from './workspace.service';
import { ApiTags } from '@nestjs/swagger';
import { IOffice } from 'src/office/office.types';
import { ICustomRequest } from 'src/shared';

@Controller('workspace')
@ApiTags('Workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('/')
  findAll() {
    return this.workspaceService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.workspaceService.findById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.workspaceService.delete(id);
  }

  @Post('/')
  create(@Body() createWorkspaceDto: Partial<IOffice>) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Patch('/')
  patch(
    @Body() updateWorkspaceDto: Partial<IOffice>,
    @Req() req: ICustomRequest,
  ) {
    return this.workspaceService.patch(updateWorkspaceDto, req.user._id);
  }
}
