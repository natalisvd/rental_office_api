import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IOffice } from './office.types';
import { modelsVocabulary } from 'src/shared';
import { Office } from './office.schema';

const { OFFICE_MODEL } = modelsVocabulary;

@Injectable()
export class OfficeService {
  constructor(
    @Inject(OFFICE_MODEL) private readonly officeModel: Model<IOffice>,
  ) {}

  async findAll() {
    const offices = await this.officeModel.find();

    return offices;
  }

  async patch(updateOfficeDto: Partial<IOffice>, userId: string) {
    return this.officeModel.findOneAndUpdate({ _id: userId }, updateOfficeDto, {
      new: true,
    });
  }

  async findById(id: string) {
    return await this.findOne({ _id: id });
  }

  async delete(id: string) {
    return await this.officeModel.findByIdAndDelete(id);
  }

  async create(createOfficeDto: Partial<IOffice>) {
    const createdJob = await new Office(createOfficeDto);
    return createdJob.save();
  }

  findOne(params: Partial<IOffice>): Promise<IOffice | null> {
    return this.officeModel.findOne({ params });
  }
}
