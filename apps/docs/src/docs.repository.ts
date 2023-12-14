import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository, DocDocument } from '@app/common';

@Injectable()
export class DocsRepository extends AbstractRepository<DocDocument> {
  protected readonly logger = new Logger(DocsRepository.name);

  constructor(
    @InjectModel(DocDocument.name)
    docModel: Model<DocDocument>,
  ) {
    super(docModel);
  }
}
