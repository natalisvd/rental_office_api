import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './user.service';

import { GetAllUserPresenter, PatchUserDto, UserPresenter } from './dto';

import { ICustomRequest, vocabulary } from 'src/shared';

const {
  users: { USER_NOT_FOUND, EMAIL_IS_TAKEN },
} = vocabulary;

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of users',
    type: GetAllUserPresenter,
  })
  @Get('/')
  findAll(): Promise<GetAllUserPresenter> {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully deleted reaction',
    type: UserPresenter,
  })
  @ApiNotFoundResponse({
    example: {
      message: USER_NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not presented in database',
  })
  @ApiBadRequestResponse({
    description: 'When email is taken when you truing to update yours',
    example: {
      message: EMAIL_IS_TAKEN,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Patch('/')
  patch(
    @Body() updateUserDto: PatchUserDto,
    @Req() req: ICustomRequest,
  ): Promise<UserPresenter> {
    return this.usersService.patch({
      updateUserDto,
      userId: req.user._id,
    });
  }
}
