import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  from: process.env.EMAIL_FROM,
}));
