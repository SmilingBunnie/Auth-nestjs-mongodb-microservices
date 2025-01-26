import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  email: string;
  @Prop({
    required: false,
  })
  firstName: string;
  @Prop({
    required: false,
  })
  lastName: string;
  @Prop({
    required: false,
  })
  passwordHash: string;
  @Prop({
    required: false,
  })
  avatar: string;
  @Prop({
    required: false,
  })
  isVerified: boolean;
  @Prop({
    required: false,
  })
  phoneNumber: string;
  @Prop({
    required: true,
    enum: Role,
  })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
