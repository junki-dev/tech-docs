import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';

import { CrawlerFactory } from './crawler.factory';
import { CrawlersService } from './crawlers.service';
import { InflearnParserService } from './inflearn-parser.service';
import { TossParserService } from './toss-parser.service';

import { DOCS_SERVICE_NAME, DOCS_PACKAGE_NAME, HealthModule, LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    HealthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TARGET_COMPANIES: Joi.string().required(),
        TOSS_BASE_URI: Joi.string().required(),
        INFLEARN_BASE_URI: Joi.string().required(),
        DOCS_GRPC_URL: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: DOCS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: DOCS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/docs.proto'),
            url: configService.getOrThrow('DOCS_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [CrawlersService, TossParserService, InflearnParserService, CrawlerFactory],
})
export class CrawlersModule {}
