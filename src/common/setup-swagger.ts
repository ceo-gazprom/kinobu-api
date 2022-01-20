import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Kinobu API')
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )

    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(
    `Documentation: http://localhost:${process.env.API_PORT}/documentation`,
  );
}
