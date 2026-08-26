import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestHandler } from 'express';

export type ApiReferenceFactory = (options: Record<string, unknown>) => RequestHandler;

export async function setupSwagger(
  app: INestApplication,
  apiReferenceFactory?: ApiReferenceFactory,
): Promise<void> {
  const apiReference =
    apiReferenceFactory ??
    ((await import('@scalar/nestjs-api-reference')).apiReference as ApiReferenceFactory);
  const config = new DocumentBuilder()
    .setTitle('Visit Servant API')
    .setDescription('Visit Servant User Front API 문서')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('openapi', app, document, {
    ui: false,
    raw: ['json'],
    jsonDocumentUrl: 'docs/json',
  });

  app.use(
    '/docs',
    apiReference({
      url: '/docs/json',
      sources: [
        {
          title: 'Visit Servant API',
          slug: 'api-1',
          url: '/docs/json',
        },
      ],
      pageTitle: 'Visit Servant API Docs',
      theme: 'purple',
    }),
  );
}
