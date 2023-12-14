import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { AbstractDocument } from '@app/common';

export class PaginationDto<TDocument extends AbstractDocument> {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  skip: number;

  @IsString()
  @IsOptional()
  sortField: keyof TDocument;

  @IsString()
  @IsOptional()
  sortOrder: 'asc' | 'desc';
}
