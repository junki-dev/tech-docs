import { IsEnum, IsOptional } from 'class-validator';

import { CompanyEnum, CompanyEnumType, DocDocument, PaginationDto } from '@app/common';

export class GetAllDocsDto extends PaginationDto<DocDocument> {
  @IsOptional()
  @IsEnum(CompanyEnum)
  company: CompanyEnumType;
}
