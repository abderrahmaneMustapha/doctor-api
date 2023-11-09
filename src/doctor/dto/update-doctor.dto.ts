import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  @ApiProperty({
    example: 'Dr. John Doe',
    description: 'Full name of the doctor',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the doctor',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: "Password for the doctor's account",
    required: false,
    type: 'string',
    format: 'password',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: 'Cardiology',
    description: 'Specialization of the doctor',
    required: false,
  })
  @IsString()
  @IsOptional()
  specialization?: string;
}
