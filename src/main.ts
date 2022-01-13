import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as RateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { setupLogLevels, setupSwagger } from './common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: setupLogLevels(process.env.NODE_ENV === 'production'),
  });

  /**
   * Protection against vulnerabilities by setting HTTP headers.
   * @see https://docs.nestjs.com/security/helmet
   */
  app.use(helmet());

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
   * @see https://docs.nestjs.com/techniques/cookies
   */
  app.use(cookieParser());

  /**
   * To enable CORS
   * @see https://docs.nestjs.com/security/cors
   */
  app.enableCors();

  /**
   * Setting a prefix for each route
   * @see https://docs.nestjs.com/faq/global-prefix
   */
  app.setGlobalPrefix('api');

  /**
   * Allows you to have different versions of routes
   * @see https://docs.nestjs.com/techniques/versioning
   */
  app.enableVersioning();

  /**
   * Automatic validation at the application level, endpoints are protected from receiving incorrect data.
   * @see https://docs.nestjs.com/techniques/validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /** Property not included in the whitelist is automatically stripped from the resulting object */
      whitelist: true,
      /** Automatically transform payloads to be objects types according to their DTO classes */
      transform: true,
    }),
  );

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
  if (process.env.ENVIRONMENT == 'development') setupSwagger(app);

  await app.listen(Number(process.env.API_PORT));

  console.info(`Server running on port ${process.env.API_PORT}`);

  return app;
}

void bootstrap();
