import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as RateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { setupSwagger } from './common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Protection against vulnerabilities by setting HTTP headers.
   */
  app.use(helmet());

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  /**
   * Turn on the display of documentation if we are in the development environment
   */
  if (process.env.ENVIRONMENT == 'dev') setupSwagger(app);

  await app.listen(Number(process.env.API_PORT));

  console.info(`Server running on port ${process.env.API_PORT}`);

  return app;
}

void bootstrap();
