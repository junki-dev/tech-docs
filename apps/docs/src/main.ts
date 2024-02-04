import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { DocsModule } from './docs.module';

import { DOCS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(DocsModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: DOCS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/docs.proto'),
      url: configService.getOrThrow('DOCS_GRPC_URL'),
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow('HTTP_PORT'));
}
bootstrap();
