import { Logger, InternalServerErrorException } from '@nestjs/common';

export abstract class AbstractCrawlers {
  protected abstract readonly logger: Logger;

  async getHtml(uri: string): Promise<string> {
    return fetch(uri)
      .then((response) => response.text())
      .catch((error) => {
        this.logger.error(`failed to get html, uri=${uri} error=${error.message}`);
        throw new InternalServerErrorException(`failed to get html, uri=${uri}`);
      });
  }
}
