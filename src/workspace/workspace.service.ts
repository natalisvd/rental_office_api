import { Inject, Injectable } from '@nestjs/common';
import { modelsVocabulary } from 'src/shared';
import { Model } from 'mongoose';
import { IWorkspace } from './workspace.types';
import { Workspace } from './workspace.schema';

const { WORKSPACE_MODEL } = modelsVocabulary;

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject(WORKSPACE_MODEL) private readonly workspaceModel: Model<IWorkspace>,
  ) {}

  async findAll() {
    const workspaces = await this.workspaceModel.find();

    return workspaces;
  }

  async patch(updateOfficeDto: Partial<IWorkspace>, userId: string) {
    return this.workspaceModel.findOneAndUpdate(
      { _id: userId },
      updateOfficeDto,
      {
        new: true,
      },
    );
  }

  async findById(id: string) {
    return await this.findOne({ _id: id });
  }

  async delete(id: string) {
    return await this.workspaceModel.findByIdAndDelete(id);
  }

  async create(createOfficeDto: Partial<IWorkspace>) {
    const createdJob = await new Workspace(createOfficeDto);
    return createdJob.save();
  }

  findOne(params: Partial<IWorkspace>): Promise<IWorkspace | null> {
    return this.workspaceModel.findOne({ params });
  }
}
