import { ICreateNewsDto } from '@shared-libs';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateNewsDto implements ICreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsNotEmpty()
  providerId!: string;

  @IsDateString()
  @IsOptional()
  createdAt?: Date;
}
