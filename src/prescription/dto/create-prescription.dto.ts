import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty({ example: 'd123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: 'p123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'Amoxicillin' })
  @IsString()
  @IsNotEmpty()
  medication: string;

  @ApiProperty({ example: '500 mg' })
  @IsString()
  @IsNotEmpty()
  dosage: string;

  @ApiProperty({ example: 'Three times a day' })
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ example: '2023-01-10T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
