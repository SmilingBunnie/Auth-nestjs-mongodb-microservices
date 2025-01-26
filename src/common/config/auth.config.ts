import { registerAs } from '@nestjs/config';
import ms, { StringValue } from 'ms';

function seconds(msValue: StringValue): number {
  return ms(msValue) / 1000;
}

export default registerAs(
  'auth',
  (): Record<string, unknown> => ({
    accessToken: {
      secret:
        process.env.ACCESS_TOKEN_SECRET_KEY ??
        'Zr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?',
      expirationTime: process.env.ACCESS_TOKEN_EXPIRED ?? '1d',
    },
    refreshToken: {
      secret:
        process.env.REFRESH_TOKEN_SECRET_KEY ??
        'Zr4u7x!A%D*G-JaNdRgUkXp2s5v8y/C?',
      expirationTime: process.env.REFRESH_TOKEN_EXPIRED ?? '7d',
    },
  }),
);
