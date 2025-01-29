import { INewsDto } from '@libs';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateNewsDto implements INewsDto {
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
}
