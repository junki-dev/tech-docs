import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

import { AbstractCrawlerFactory } from './crawler.factory';

import { DocDto } from '@app/common';

@Injectable()
export class TossParserService implements AbstractCrawlerFactory {
  private readonly logger = new Logger(TossParserService.name);

  async parser(baseUri: string, data: string): Promise<DocDto[]> {
    try {
      const $ = cheerio.load(data);
      const body = $('body div div div div ul li a');

      const docs: DocDto[] = [];
      $(body).each((i, el) => {
        const path = $(el).attr('href');
        const title = $(el).find('div span').eq(0).text();
        const date = $(el).find('div span').eq(2).text();

        if (path && title && date) {
          docs.push({
            title,
            createdAt: new Date(date),
            originUri: `${baseUri}${path}`,
          });
        }
      });

      return docs;
    } catch (error) {
      this.logger.error(`failed to crawling tech docs`);
    }
  }
}
