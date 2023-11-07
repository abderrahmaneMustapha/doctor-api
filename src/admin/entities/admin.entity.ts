import { User } from 'src/user/entities/user.entity';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Admin extends User {}
