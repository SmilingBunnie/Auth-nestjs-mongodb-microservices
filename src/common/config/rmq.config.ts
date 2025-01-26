import { registerAs } from '@nestjs/config';

export default registerAs(
  'rmq',
  (): Record<string, unknown> => ({
    uri: process.env.RABBITMQ_URL ?? 'amqp://localhost:5672',
    queue: process.env.RABBITMQ_QUEUE ?? 'jobs',
  }),
);
