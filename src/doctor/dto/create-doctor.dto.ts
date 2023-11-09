import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'Dr. John Doe',
    description: 'Full name of the doctor',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the doctor',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: "Password for the doctor's account",
    required: true,
    type: 'string',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Cardiology',
    description: 'Specialization of the doctor',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  specialization: string;
}
