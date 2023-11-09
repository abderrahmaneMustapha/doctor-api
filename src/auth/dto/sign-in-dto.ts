import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'The password for the account',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
