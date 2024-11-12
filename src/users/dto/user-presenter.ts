import { ApiProperty } from '@nestjs/swagger';

import { IUser, UserRole } from '../user.types';

export class UserPresenter {
  @ApiProperty({
    example: 'd0601328-1486-434a-860e-75b843a682db',
    type: String,
    description: 'Represents id of the author',
  })
  _id: string;

  @ApiProperty({
    example: 'John',
    type: String,
    description: 'Represents first name of the author',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    type: String,
    description: 'Represents last name of the author',
  })
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    type: String,
    description: 'Represents email of the author',
  })
  email: string;

  @ApiProperty({
    example: 'user',
    type: String,
    description: 'Represents the role of the author',
  })
  role: UserRole;

  @ApiProperty({
    example: '2024-08-14T08:40:32.000Z',
    type: String,
    description: 'Represents the creation date of the author',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-14T08:40:32.000Z',
    type: String,
    description: 'Represents the last update date of the author',
  })
  updatedAt: Date;

  constructor(user: IUser) {
    this._id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
