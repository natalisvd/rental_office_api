import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { GetAllUserPresenter, PatchUserDto, UserPresenter } from './dto';

import { hashPassword } from 'src/auth/utils/passwordUtils';

import { IUser } from './user.types';

import { vocabulary, modelsVocabulary } from 'src/shared';

const {
  users: { USER_NOT_FOUND, EMAIL_IS_TAKEN },
} = vocabulary;

const { USER_MODEL } = modelsVocabulary;

@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<IUser>) {}

  async findAll(): Promise<GetAllUserPresenter> {
    const users = await this.userModel.find();

    return new GetAllUserPresenter(users, users.length);
  }

  async patch({
    updateUserDto,
    userId,
  }: {
    updateUserDto: Partial<PatchUserDto>;
    userId: string;
  }): Promise<UserPresenter> {
    const user = await this.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (updateUserDto.email) {
      const searchedUser = await this.findOne({ email: updateUserDto.email });
      if (searchedUser) {
        throw new BadRequestException(EMAIL_IS_TAKEN);
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    const updateObject = {
      ...updateUserDto,
    };

    user.set(updateObject);

    const updatedUser = await user.save();

    return updatedUser;
  }

  findOne(params: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findOne({ where: params });
  }
}
