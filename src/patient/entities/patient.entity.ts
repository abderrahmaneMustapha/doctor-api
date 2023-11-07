import { User } from 'src/user/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Patient extends User {
  @Column()
  dateOfBirth: string;

  @Column()
  address: string;
}
