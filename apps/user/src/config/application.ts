import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { validationExceptionFactory } from './validation-exception.factory';
import { ApiReferenceFactory, setupSwagger } from './swagger';

export interface ConfigureApplicationOptions {
  enableSwagger?: boolean;
  apiReferenceFactory?: ApiReferenceFactory;
}

export async function configureApplication(
  app: NestExpressApplication,
  options: ConfigureApplicationOptions = {},
): Promise<void> {
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('app.nodeEnv', 'development');
  const apiPrefix = configService.get<string>('app.apiPrefix', 'api');
  const trustProxyHops = configService.get<number>('app.trustProxyHops', 0);
  const allowedOrigins = configService.get<string[]>('app.corsAllowedOrigins', []);

  if (trustProxyHops > 0) app.set('trust proxy', trustProxyHops);

  app.use(
    helmet({
      contentSecurityPolicy:
        nodeEnv === 'production'
          ? undefined
          : {
              directives: {
                scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
                styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'", 'https://cdn.jsdelivr.net'],
                workerSrc: ["'self'", 'blob:', 'https://cdn.jsdelivr.net'],
              },
            },
    }),
  );

  app.enableCors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('허용되지 않은 CORS Origin입니다.'), false);
    },
  });

  app.setGlobalPrefix(apiPrefix, {
    exclude: [
      { path: 'health/live', method: RequestMethod.GET },
      { path: 'health/ready', method: RequestMethod.GET },
    ],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.enableShutdownHooks();

  if (options.enableSwagger ?? nodeEnv !== 'production') {
    await setupSwagger(app, options.apiReferenceFactory);
  }
}
