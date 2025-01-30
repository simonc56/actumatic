import { ICreateProviderDto } from '@shared-libs';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProviderDto implements ICreateProviderDto {
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
