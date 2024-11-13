import { Inject, Injectable } from '@nestjs/common';
import { IPurchase } from './purchase.types';
import { Purchase } from './purchase.schema';
import { modelsVocabulary } from 'src/shared';
import { Model } from 'mongoose';

const { PURCHASE_MODEL } = modelsVocabulary;

@Injectable()
export class PurchaseService {
  constructor(
    @Inject(PURCHASE_MODEL) private readonly purchaseModel: Model<IPurchase>,
  ) {}

  async findAll() {
    const purchases = await this.purchaseModel.find();

    return purchases;
  }

  async patch(updatePurchaseDto: Partial<IPurchase>, userId: string) {
    return this.purchaseModel.findOneAndUpdate(
      { _id: userId },
      updatePurchaseDto,
      {
        new: true,
      },
    );
  }

  async findById(id: string) {
    return await this.findOne({ _id: id });
  }

  async delete(id: string) {
    return await this.purchaseModel.findByIdAndDelete(id);
  }

  async create(createPurchaseDto: Partial<IPurchase>) {
    const createdJob = await new Purchase(createPurchaseDto);
    return createdJob.save();
  }

  findOne(params: Partial<IPurchase>): Promise<IPurchase | null> {
    return this.purchaseModel.findOne({ params });
  }
}
