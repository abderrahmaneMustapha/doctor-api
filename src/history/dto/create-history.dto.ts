import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  doctorId: number;

  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;

  @IsString()
  notes?: string;
}
