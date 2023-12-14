import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DocsController } from './docs.controller';
import { DocsRepository } from './docs.repository';
import { DocsService } from './docs.service';

import { DatabaseModule, DocDocument, DocsSchema, LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: DocDocument.name, schema: DocsSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [DocsController],
  providers: [DocsService, DocsRepository],
})
export class DocsModule {}
