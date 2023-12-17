import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

import { AbstractCrawlerFactory } from './crawler.factory';

import { DocDto } from '@app/common';

@Injectable()
export class InflearnParserService implements AbstractCrawlerFactory {
  private readonly logger = new Logger(InflearnParserService.name);

  async parser(baseUri: string, data: string): Promise<DocDto[]> {
    try {
      const originUri = baseUri.replace('/posts', '');
      const $ = cheerio.load(data);
      const body = $('body div div div main div div div div a');

      const docs: DocDto[] = [];

      $(body).each((i, el) => {
        const path = $(el).attr('href');
        const title = $(el).find('div.title').text();
        const date = $(el).find('div div.date').text();

        if (path && title && date) {
          docs.push({
            title,
            createdAt: new Date(date),
            originUri: `${originUri}${path}`,
          });
        }
      });

      return docs;
    } catch (error) {
      this.logger.error(`failed to crawling tech docs`);
    }
  }
}
