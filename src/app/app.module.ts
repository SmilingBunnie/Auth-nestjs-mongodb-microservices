import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

@Module({
  imports: [
    TerminusModule,
    CommonModule,
    UserModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://admin:password@localhost:27018/',
      }),
      inject: [ConfigService],
    }),
    //ConfigModule.forRoot({ isGlobal: true, load: [] }),
  ],
  controllers: [AppController],
})
export class AppModule {}
