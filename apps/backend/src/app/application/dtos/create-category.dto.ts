import { ICategoryDto } from '@libs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements ICategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
