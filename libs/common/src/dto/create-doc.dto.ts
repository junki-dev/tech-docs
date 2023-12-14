import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';

import { CompanyEnumType, DocDto } from '@app/common';

export class CreateDocDto {
  // @IsEnum(CompanyEnum)
  @IsNotEmpty()
  company: CompanyEnumType;

  @IsArray()
  @IsDefined({ each: true })
  @ValidateNested({ each: true })
  @Type(() => DocDto)
  docs: DocDto[];
}
