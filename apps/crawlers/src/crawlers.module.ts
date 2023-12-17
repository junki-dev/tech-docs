import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';

import { CrawlerFactory } from './crawler.factory';
import { CrawlersService } from './crawlers.service';
import { InflearnParserService } from './inflearn-parser.service';
import { TossParserService } from './toss-parser.service';

import { DOCS_SERVICE, HealthModule, LoggerModule } from '@app/common';

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
        DOCS_HOST: Joi.string().required(),
        DOCS_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: DOCS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow('DOCS_HOST'),
            port: configService.getOrThrow('DOCS_PORT'),
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
