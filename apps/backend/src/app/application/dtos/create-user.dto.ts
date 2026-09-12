import { ICreateUserDto } from '@actumatic/libs';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
