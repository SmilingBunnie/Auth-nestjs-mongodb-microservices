import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CommonModule } from 'src/common/common.module';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from '../../schemas/users.schema';
import { UserModule } from '../user/user.module';
import { PublicAuthController } from './controllers/auth.public.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CommonModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
  ],
  controllers: [PublicAuthController],
  providers: [AuthService],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
