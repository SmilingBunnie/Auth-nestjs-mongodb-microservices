import { Injectable } from '@nestjs/common';

import { AuthSignupDto } from 'src/modules/auth/dtos/auth.signup.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from 'src/modules/user/dtos/user.response.dto';
import { UserUpdateDto } from 'src/modules/user/dtos/user.update.dto';
import { User } from '../../../schemas/users.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(userId: string): Promise<UserResponseDto> {
    return await this.userModel.findOne({ _id: userId });
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    return await this.userModel.findOne({ email });
  }

  async updateUser(userId: string, data: UserUpdateDto) {
    const { firstName, lastName, email, phoneNumber, avatar } = data;
    return await this.userModel.updateOne(
      {
        id: userId,
      },
      {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        email,
        phoneNumber,
        avatar,
      },
    );
  }

  async createUser(data: AuthSignupDto) {
    const user = await new this.userModel({
      email: data?.email,
      password: data?.password,
      firstName: data?.firstName.trim(),
      lastName: data?.lastName.trim(),
      role: 'USER',
    });
    user.save();
    return user;
  }

  async softDeleteUsers(userIds: string[]) {
    /*await this.userModel.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });*/
    return;
  }
}
