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

import { WorkspaceService } from './workspace.service';

import { ICustomRequest } from 'src/shared';

import { IWorkspace } from './workspace.types';

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
  create(@Body() createWorkspaceDto: Partial<IWorkspace>) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Patch('/')
  patch(
    @Body() updateWorkspaceDto: Partial<IWorkspace>,
    @Req() req: ICustomRequest,
  ) {
    return this.workspaceService.patch(updateWorkspaceDto, req.user._id);
  }
}
