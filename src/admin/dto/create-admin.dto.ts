import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'John Admin',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.admin@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'AdminSecurePassword123!',
    required: true,
    type: 'string',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
