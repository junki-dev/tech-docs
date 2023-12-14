import { Injectable, Logger } from '@nestjs/common';

import { DocsRepository } from './docs.repository';

import { CreateDocDto, DocDto } from '@app/common';

@Injectable()
export class DocsService {
  private readonly logger = new Logger(DocsService.name);

  constructor(private readonly docsRepository: DocsRepository) {}

  async createDocs(createDocDto: CreateDocDto) {
    const filteredDocDtoList: DocDto[] = [];
    await Promise.all(
      createDocDto.docs.map(async (doc) => {
        const existDoc = await this.docsRepository.findOne({ originUri: doc.originUri });
        if (!existDoc) {
          filteredDocDtoList.push(doc);
        }
      }),
    );

    if (filteredDocDtoList.length > 0) {
      await this.docsRepository.saveAll(
        filteredDocDtoList.map((doc) => {
          return { ...doc, company: createDocDto.company };
        }),
      );
    } else {
      this.logger.log(`not found new technical documentation, company=${createDocDto.company}`);
    }
  }
}
