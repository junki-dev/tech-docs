import { Logger, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NotFoundError } from 'rxjs';

import { DocDto } from '@app/common';

export abstract class AbstractCrawlers {
  protected abstract readonly logger: Logger;

  async getHtml(uri: string): Promise<string> {
    return axios
      .get(uri)
      .then((response) => {
        if (!response) {
          throw new NotFoundError(`not found data`);
        }

        return response.data;
      })
      .catch((error) => {
        this.logger.error(`failed to get html, uri=${uri} error=${error.message}`);
        throw new InternalServerErrorException(`failed to get html, uri=${uri}`);
      });
  }

  async parseHtml(data: string, baseUrl: string, selector: string) {
    const $ = cheerio.load(data);
    const body = $(selector);

    const docs: DocDto[] = [];
    $(body).each((i, el) => {
      const url = $(el).attr('href');
      const title = $(el).find('div span').eq(0).text();
      const date = $(el).find('div span').eq(2).text();

      if (url && title && date) {
        docs.push({
          title,
          createdAt: new Date(date),
          originUri: `${baseUrl}${url}`,
        });
      }
    });

    return docs;
  }
}
