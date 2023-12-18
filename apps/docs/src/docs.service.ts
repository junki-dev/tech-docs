import { Injectable, Logger } from '@nestjs/common';

import { DocsRepository } from './docs.repository';
import { GetAllDocsDto } from '../dto/get-all-docs.dto';

import { CreateDocDto, DocDocument, DocDto, PaginationDto } from '@app/common';

@Injectable()
export class DocsService {
  private readonly logger = new Logger(DocsService.name);

  constructor(private readonly docsRepository: DocsRepository) {}

  async getAllDocs(getAllDocsDto: GetAllDocsDto): Promise<DocDto[]> {
    const paginationDto = getAllDocsDto as PaginationDto<DocDocument>;

    const filterQuery: DocDocument = {} as DocDocument;
    if (getAllDocsDto.company) {
      filterQuery.company = getAllDocsDto.company;
    }

    return this.docsRepository.findWithPagination(filterQuery, paginationDto);
  }

  async createDocs(createDocDto: CreateDocDto) {
    const filteredDocDtoList: Array<Partial<DocDto>> = [];
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
