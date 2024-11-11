import { Request } from 'express';

import { IUser } from 'src/users/user.types';

export interface ICustomRequest extends Request {
  user: IUser;
}

export type OrderType = 'ASC' | 'DESC';

export interface IError {
  message: string;
  code: number;
}

export interface IResponse {
  is_success: boolean;
  data: any;
  errors: IError[];
}
