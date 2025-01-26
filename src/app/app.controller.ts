import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

import { TransformMessagePayload } from 'src/common/decorators/payload.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: '/',
})
export class AppController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('hello')
  //@Public()
  public hello() {
    return {
      status: 200,
      message: `Hello from')}`,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('/health')
  @HealthCheck()
  @Public()
  public async getHealth() {
    return this.healthCheckService.check([
      async () => this.mongoose.pingCheck('mongodb'),
    ]);
  }

  @MessagePattern('validateToken')
  public async getUserByAccessToken(
    @TransformMessagePayload() payload: Record<string, string>,
  ) {
    return this.authService.verifyToken(payload.token);
  }

  @MessagePattern('getUserById')
  public async getUserById(
    @TransformMessagePayload() payload: Record<string, string>,
  ) {
    return this.userService.getUserById(payload.userId);
  }

  @MessagePattern('getUserByEmail')
  public async getUserByEmail(
    @TransformMessagePayload() payload: Record<string, string>,
  ) {
    return this.userService.getUserByEmail(payload.userName);
  }
}
