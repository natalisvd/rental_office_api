import mongoose, { Schema } from 'mongoose';
import { IPurchase, RentEnum, PaymentEnum } from './purchase.types';

const PurchaseSchema = new Schema<IPurchase>({
  rentType: {
    type: String,
    enum: Object.values(RentEnum),
    required: true,
    default: RentEnum.DAY,
  },
  paymentType: {
    type: String,
    enum: Object.values(PaymentEnum),
    required: true,
    default: PaymentEnum.CASH,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  comment: { type: String },
  isPaid: { type: Boolean, required: false },
  place: { type: Schema.Types.Mixed, required: true },
  userId: { type: String, ref: 'User' },
  amountOfPeople: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

PurchaseSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

PurchaseSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const Purchase = mongoose.model<IPurchase>('Purchases', PurchaseSchema);
