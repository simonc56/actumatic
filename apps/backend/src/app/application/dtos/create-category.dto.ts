import { ICreateCategoryDto } from '@libs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements ICreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
