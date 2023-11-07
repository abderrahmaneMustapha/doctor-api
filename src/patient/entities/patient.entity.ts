import { User } from 'src/user/entities/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class Patient extends User {
  @Column()
  dateOfBirth: string;

  @Column()
  address: string;
}
