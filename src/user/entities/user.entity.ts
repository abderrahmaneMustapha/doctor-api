import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier for the user',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true,
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    required: true,
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'The password for the user account',
    required: true,
    type: 'string',
    format: 'password',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'The type of the user',
    required: true,
  })
  @Column()
  type: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
