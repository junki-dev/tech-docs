import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AbstractCrawlers } from './abstract.crawlers';
import { CrawlerFactory } from './crawler.factory';

import { DOCS_SERVICE } from '@app/common';

@Injectable()
export class CrawlersService extends AbstractCrawlers implements OnModuleInit {
  protected readonly logger = new Logger(CrawlersService.name);

  private readonly targetCompanies: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly crawlerFactory: CrawlerFactory,
    @Inject(DOCS_SERVICE) private readonly docsClient: ClientProxy,
  ) {
    super();
    this.targetCompanies = configService.get('TARGET_COMPANIES');
  }

  onModuleInit() {
    this.crawling();
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async crawling() {
    this.logger.log(`Start Crawling companies=${this.targetCompanies}`);

    const companies = this.targetCompanies.split(' ');
    for (const company of companies) {
      const [companyParser, baseUri] = this.crawlerFactory.getCompanyParser(company);
      const html = await this.getHtml(baseUri);

      const docs = await companyParser.parser(baseUri, html);
      this.docsClient.emit('create_docs', {
        company,
        docs,
      });
    }
  }
}
