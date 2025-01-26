import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from '../../../schemas/users.schema';

export class UserResponseDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: faker.internet.email(),
  })
  email: string;

  @ApiProperty({
    description: 'First name of the user',
    example: faker.person.firstName(),
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: faker.person.lastName(),
  })
  lastName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: faker.phone.imei(),
  })
  _id: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: faker.phone.number(),
  })
  phoneNumber: string;

  @ApiProperty({
    description: "URL of the user's profile picture",
    example: faker.image.avatar(),
    required: false,
  })
  avatar: string;

  @ApiProperty({
    description: "Indicates if the user's email is verified",
    example: true,
  })
  isVerified: boolean;

  @ApiProperty({
    description: 'Role of the user in the system',
    enum: Role,
    example: Role.USER,
  })
  role: string;

  @Exclude()
  passwordHash: string;
}
