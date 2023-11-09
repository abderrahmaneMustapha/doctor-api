import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';

export enum UserType {
  Doctor = 'Doctor',
  Patient = 'Patient',
}

export class SignupDto {
  @ApiProperty({
    example: UserType.Doctor,
    enum: UserType,
    description: 'The type of user to create (Doctor or Patient)',
  })
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({
    type: 'object',
    description: 'User data for the doctor or patient',
    oneOf: [
      { $ref: '#/components/schemas/CreateDoctorDto' },
      { $ref: '#/components/schemas/CreatePatientDto' },
    ],
  })
  @ValidateNested()
  @Type((options) => {
    const object = options.object as SignupDto;
    if (!object || !object.type) {
      return undefined;
    }
    switch (object.type) {
      case UserType.Doctor:
        return CreateDoctorDto;
      case UserType.Patient:
        return CreatePatientDto;
      default:
        return undefined;
    }
  })
  userData: CreateDoctorDto | CreatePatientDto;
}
