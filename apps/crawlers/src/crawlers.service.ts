import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AbstractCrawlers } from './abstract.crawlers';
import { CrawlerFactory } from './crawler.factory';

import { DOCS_SERVICE_NAME, DocsServiceClient } from '@app/common';

@Injectable()
export class CrawlersService extends AbstractCrawlers implements OnModuleInit {
  protected readonly logger = new Logger(CrawlersService.name);

  private readonly targetCompanies: string;
  private docsService: DocsServiceClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly crawlerFactory: CrawlerFactory,
    @Inject(DOCS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {
    super();
    this.targetCompanies = configService.get('TARGET_COMPANIES');
  }

  onModuleInit() {
    this.docsService = this.client.getService<DocsServiceClient>(DOCS_SERVICE_NAME);

    this.crawling()
      .then(() => {
        this.logger.log(`succeed to crawling, now=${new Date().toISOString()}`);
      })
      .catch((error) => {
        this.logger.log(
          `failed to crawling, now=${new Date().toISOString()} error=${error.message}`,
        );
      });
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async crawling() {
    this.logger.log(`Start Crawling companies=${this.targetCompanies}`);

    const companies = this.targetCompanies.split(' ');
    for (const company of companies) {
      const [companyParser, baseUri] = this.crawlerFactory.getCompanyParser(company);
      const html = await this.getHtml(baseUri);

      const docs = await companyParser.parser(baseUri, html);
      this.docsService
        .createDocs({
          company,
          docs,
        })
        .subscribe((error) =>
          this.logger.error(
            `failed to create docs(grpc_createDocs), error=${JSON.stringify(error)}`,
          ),
        );
    }
  }
}
