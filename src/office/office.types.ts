import { Document } from 'mongoose';

export interface IOffice extends Document {
  _id: string;
  name: string;
  floor: number;
}
