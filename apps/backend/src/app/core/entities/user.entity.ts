export class User {
  id?: string;
  email!: string;
  name!: string;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
