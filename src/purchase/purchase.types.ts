import { Document } from 'mongoose';

export interface IPurchase extends Document {
  _id: string;
  rentType: RentType;
  paymentType: string;
  startDate: Date;
  endDate: Date;
  comment?: string;
  isPaid: boolean;
  place: any;
  userId: string;
  amountOfPeople: number;
  createdAt: Date;
  updatedAt: Date;
}

export type RentType =
  | RentEnum.DAY
  | RentEnum.HALF_YEAR
  | RentEnum.HOURLY
  | RentEnum.MONTH
  | RentEnum.YEAR;

export enum RentEnum {
  HOURLY = 'HOURLY',
  DAY = 'DAY',
  MONTH = 'MONTH',
  HALF_YEAR = 'HALF_YEAR',
  YEAR = 'YEAR',
}

export type PaymentType = PaymentEnum.CARD | PaymentEnum.CASH;

export enum PaymentEnum {
  CARD = 'CARD',
  CASH = 'CASH',
}
