import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { DocsService } from './docs.service';
import { GetAllDocsDto } from '../dto/get-all-docs.dto';

import { CreateDocDto, DocDto } from '@app/common';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  getAllDocs(@Query() getAllDocsDto: GetAllDocsDto): Promise<DocDto[]> {
    return this.docsService.getAllDocs(getAllDocsDto);
  }

  @EventPattern('create_docs')
  createDocs(@Payload() createDocDto: CreateDocDto) {
    return this.docsService.createDocs(createDocDto);
  }
}
