export class User {
  id?: string;
  email!: string;
  name!: string;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
