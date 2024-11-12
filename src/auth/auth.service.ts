// nest
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { CreateUserDto, SignInDto } from 'src/users/dto';
import { SignInPresenter, SignUpPresenter } from './dto';

import { hashPassword, verifyPassword } from './utils/passwordUtils';

import { ITokens } from './auth.types';
import { IUser } from 'src/users/user.types';

import { config } from '../config';

import { vocabulary, modelsVocabulary } from 'src/shared';

const {
  auth: { WRONG_PASSWORD },
  users: { USER_NOT_FOUND: NOT_FOUND, ALREADY_EXISTS },
} = vocabulary;

const { USER_MODEL } = modelsVocabulary;

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL) private readonly userModel: Model<IUser>,
    readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<SignUpPresenter> {
    const user = await this.userModel.findOne({
      where: { email: signUpDto.email },
    });

    if (user) {
      throw new BadRequestException(ALREADY_EXISTS);
    }

    const userAttributes = {
      ...signUpDto,
      password: await hashPassword(signUpDto.password),
    };

    const createdUser = await this.userModel.create(userAttributes);

    return createdUser;
  }

  async signIn(signInDto: SignInDto): Promise<SignInPresenter> {
    const { password, email } = signInDto;

    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(NOT_FOUND);
    }

    const match = await verifyPassword(password, user.password);
    if (!match) {
      throw new BadRequestException(WRONG_PASSWORD);
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    return new SignInPresenter(user, accessToken, refreshToken);
  }

  async refresh(id: string): Promise<ITokens | void> {
    const user = await this.userModel.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(NOT_FOUND);
    }

    return this.generateTokens(user);
  }

  generateTokens(user: Partial<IUser>): ITokens {
    const accessToken = this.jwtService.sign(user, {
      secret: config.SECRET_ACCESS,
      expiresIn: config.EXPIRES_IN,
    });
    const refreshToken = this.jwtService.sign(user, {
      secret: config.SECRET_REFRESH,
      expiresIn: config.EXPIRES_IN_REFRESH,
    });
    return { accessToken, refreshToken };
  }
}
