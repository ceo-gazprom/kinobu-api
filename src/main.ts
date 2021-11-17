import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Turn on the display of documentation if we are in the development environment
   */
  if (process.env.ENVIRONMENT == 'dev') initSwagger(app);

  await app.listen(Number(process.env.API_PORT));
}
bootstrap();
