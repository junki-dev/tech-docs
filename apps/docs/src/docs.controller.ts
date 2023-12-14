import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { DocsService } from './docs.service';

import { CreateDocDto } from '@app/common';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @EventPattern('create_docs')
  createDocs(@Payload() createDocDto: CreateDocDto) {
    return this.docsService.createDocs(createDocDto);
  }
}
