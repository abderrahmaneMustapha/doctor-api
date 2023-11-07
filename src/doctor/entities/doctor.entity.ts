import { User } from 'src/user/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Doctor extends User {
  @Column()
  specialization: string;
}
