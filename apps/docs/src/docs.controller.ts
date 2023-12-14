import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { DocsService } from './docs.service';

import { CreateDocDto, DocDocument, DocDto, PaginationDto } from '@app/common';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  getAllDocs(@Query() paginationDto: PaginationDto<DocDocument>): Promise<DocDto[]> {
    return this.docsService.getAllDocs(paginationDto);
  }

  @EventPattern('create_docs')
  createDocs(@Payload() createDocDto: CreateDocDto) {
    return this.docsService.createDocs(createDocDto);
  }
}
