import { Controller, Get, Query } from '@nestjs/common';

import { DocsService } from './docs.service';
import { GetAllDocsDto } from '../dto/get-all-docs.dto';

import {
  CreateDocDto,
  DocDto,
  DocsServiceController,
  DocsServiceControllerMethods,
} from '@app/common';

@Controller('docs')
@DocsServiceControllerMethods()
export class DocsController implements DocsServiceController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  getAllDocs(@Query() getAllDocsDto: GetAllDocsDto): Promise<DocDto[]> {
    return this.docsService.getAllDocs(getAllDocsDto);
  }

  createDocs(createDocDto: CreateDocDto) {
    return this.docsService.createDocs(createDocDto);
  }
}
