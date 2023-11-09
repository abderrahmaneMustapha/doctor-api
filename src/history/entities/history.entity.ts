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
export class History {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
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

  @ApiProperty({ example: 'Acute Bronchitis' })
  @Column('text')
  diagnosis: string;

  @ApiProperty({ example: 'Rest, Fluids, Pain Relievers' })
  @Column('text')
  treatment: string;

  @ApiProperty({ example: 'Follow-up in 2 weeks', nullable: true })
  @Column('text', { nullable: true })
  notes: string;

  @ApiProperty({ example: '2021-07-21T17:32:28Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2021-07-21T17:32:28Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
