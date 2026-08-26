import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configureApplication } from './config/application';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const isProduction = configService.get<string>('app.nodeEnv') === 'production';

  app.useLogger(
    new ConsoleLogger({
      json: isProduction,
      colors: !isProduction,
    }),
  );

  await configureApplication(app);
  await app.listen(configService.get<number>('app.port', 3011));
}
void bootstrap();
