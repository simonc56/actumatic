import { ICreateProviderDto } from '@shared-libs';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProviderDto implements ICreateProviderDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  feedUrl!: string;

  @IsString()
  @IsNotEmpty()
  feedType!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;
}
