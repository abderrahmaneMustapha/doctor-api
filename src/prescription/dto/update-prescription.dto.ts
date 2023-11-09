import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdatePrescriptionDto {
  @ApiProperty({ example: 'd123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsOptional()
  doctorId?: string;

  @ApiProperty({ example: 'p123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsOptional()
  patientId?: string;

  @ApiProperty({ example: 'Amoxicillin' })
  @IsString()
  @IsOptional()
  medication?: string;

  @ApiProperty({ example: '500 mg' })
  @IsString()
  @IsOptional()
  dosage?: string;

  @ApiProperty({ example: 'Three times a day' })
  @IsString()
  @IsOptional()
  frequency?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ example: '2023-01-10T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;
}
