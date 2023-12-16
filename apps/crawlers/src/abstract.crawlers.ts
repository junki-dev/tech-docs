import { Logger, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { NotFoundError } from 'rxjs';

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
}
