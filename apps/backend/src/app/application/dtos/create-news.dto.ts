import { ICreateNewsDto } from '@shared-libs';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
}
