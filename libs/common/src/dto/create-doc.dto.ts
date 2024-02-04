import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';

import { CompanyEnumType, CreateDocsMessage, DocDto } from '@app/common';

export class CreateDocDto implements CreateDocsMessage {
  @IsNotEmpty()
  company: CompanyEnumType;

  @IsArray()
  @IsDefined({ each: true })
  @ValidateNested({ each: true })
  @Type(() => DocDto)
  docs: DocDto[];
}
