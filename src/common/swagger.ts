import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { version } from '../../package.json';

export function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Kinobu API')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
