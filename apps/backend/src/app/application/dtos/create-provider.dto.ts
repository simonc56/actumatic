import { IProviderDto } from '@libs';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProviderDto implements IProviderDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;
}
