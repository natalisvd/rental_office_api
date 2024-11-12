import mongoose, { Schema } from 'mongoose';
import { IOffice } from './office.types';

const OfficeSchema = new Schema<IOffice>({
  name: { type: String, required: true },
  floor: { type: Number },
});

export const Office = mongoose.model<IOffice>('Office', OfficeSchema);
