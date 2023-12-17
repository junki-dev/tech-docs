import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class DocDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @IsUrl()
  @IsNotEmpty()
  originUri: string;

  @IsUrl()
  @IsOptional()
  imageUri?: string;
}
