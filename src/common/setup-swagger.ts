import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Kinobu API')
    .setVersion(version)
    .addBearerAuth(
      {
        name: 'Authorization',
        description: `Please enter token in following format: Bearer <JWT>`,
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      /**
       * This name here is important for matching up with @ApiBearerAuth() in your controller
       */
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('documentation', app, document);

  console.info(
    `Documentation: http://localhost:${process.env.API_PORT}/documentation`,
  );
}
