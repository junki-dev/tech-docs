import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { AbstractDocument } from '@app/common';

export class PaginationDto<TDocument extends AbstractDocument> {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsString()
  @IsOptional()
  sortField: keyof TDocument;

  @IsString()
  @IsOptional()
  sortOrder: 'asc' | 'desc';
}
