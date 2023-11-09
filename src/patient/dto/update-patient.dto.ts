import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto {
  @ApiProperty({
    example: 'Jane Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    required: false,
    type: 'string',
    format: 'password',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: '1980-08-05',
    required: false,
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({
    example: '123 Main St, Anytown, AN 12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;
}
