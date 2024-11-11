import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import User from './user.schema';

import { GetAllUserPresenter, PatchUserDto, UserPresenter } from './dto';

import { hashPassword } from 'src/auth/utils/passwordUtils';

import { IUser, UpdateUserWithFile } from './user.types';

import { vocabulary } from 'src/shared';

const {
  users: { USER_NOT_FOUND, EMAIL_IS_TAKEN },
} = vocabulary;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) readonly userModel: typeof User) {}

  async findAll(): Promise<GetAllUserPresenter> {
    const users = await this.userModel.findAndCountAll();

    return new GetAllUserPresenter(users.rows, users.count);
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
    } as UpdateUserWithFile;

    user.set(updateObject);

    const updatedUser = await user.save();

    return updatedUser;
  }

  findOne(whereCondition: Partial<IUser>): Promise<User | null> {
    return this.userModel.findOne({ where: whereCondition });
  }
}
