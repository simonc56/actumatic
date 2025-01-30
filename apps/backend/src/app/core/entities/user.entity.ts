import { CreateUserDto } from "../../application/dtos/create-user.dto";

export class User {
  id?: string;
  email!: string;
  name!: string;

  constructor(props: User) {
    Object.assign(this, props);
  }
  
  static create(user: CreateUserDto): User {
    return new User(user);
  }
}
