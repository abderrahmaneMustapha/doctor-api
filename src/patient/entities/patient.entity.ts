import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class Patient extends User {
  @ApiProperty({ example: '1980-05-15' })
  @Column()
  dateOfBirth: string;

  @ApiProperty({ example: '123 Cherry Blossom Street, Springfield, ST 98765' })
  @Column()
  address: string;
}
