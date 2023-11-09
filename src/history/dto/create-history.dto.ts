import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty({ example: 'd123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: 'p123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'Acute Bronchitis' })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({ example: 'Rest, Fluids, Pain Relievers' })
  @IsString()
  @IsNotEmpty()
  treatment: string;

  @ApiProperty({ example: 'Follow-up in 2 weeks', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
