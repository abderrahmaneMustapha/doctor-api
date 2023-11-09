import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateHistoryDto {
  @ApiProperty({
    example: 'd123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  doctorId?: string;

  @ApiProperty({
    example: 'p123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  patientId?: string;

  @ApiProperty({ example: 'Acute Bronchitis', required: false })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({ example: 'Rest, Fluids, Pain Relievers', required: false })
  @IsString()
  @IsOptional()
  treatment?: string;

  @ApiProperty({ example: 'Follow-up in 2 weeks', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
