import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

import { DocsMessage } from '@app/common/types';

export class DocDto implements DocsMessage {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: string;

  @IsUrl()
  @IsNotEmpty()
  originUri: string;

  @IsUrl()
  @IsOptional()
  imageUri?: string;
}
