import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Doctor extends User {
  @ApiProperty({
    example: 'Cardiology',
    description: 'The specialization of the doctor',
    required: true,
  })
  @Column()
  specialization: string;
}
