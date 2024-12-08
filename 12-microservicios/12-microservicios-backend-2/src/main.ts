import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Corriendo BACKEND 2 en puerto 3030');

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3030 },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
