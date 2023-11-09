import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrescriptionDto {
  @IsNotEmpty()
  doctorId: string;

  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  medication: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
