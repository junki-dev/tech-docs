import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { CrawlersModule } from './crawlers.module';

async function bootstrap() {
  const app = await NestFactory.create(CrawlersModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  await app.listen(configService.getOrThrow('HTTP_PORT'));
}
bootstrap();
