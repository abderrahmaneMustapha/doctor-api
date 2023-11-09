import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Prescription {
  @ApiProperty({ example: '456e1234-e89b-12d3-a456-426655440000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Doctor })
  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ApiProperty({ example: 'Amoxicillin' })
  @Column()
  medication: string;

  @ApiProperty({ example: '500 mg' })
  @Column()
  dosage: string;

  @ApiProperty({ example: 'Three times a day' })
  @Column()
  frequency: string;

  @ApiProperty({ example: '2023-01-01' })
  @Column('date')
  startDate: Date;

  @ApiProperty({ example: '2023-01-10' })
  @Column('date')
  endDate: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
