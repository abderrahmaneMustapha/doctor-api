import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Jane Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    required: true,
    type: 'string',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '1980-08-05',
    required: true,
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({
    example: '123 Main St, Anytown, AN 12345',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
