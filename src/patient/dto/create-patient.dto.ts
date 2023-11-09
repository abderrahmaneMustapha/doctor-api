import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  address: string;
}
