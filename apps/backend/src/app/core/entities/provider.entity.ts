export class Provider {
  id?: string;
  name!: string;
  url!: string;
  categoryId!: string;

  constructor(props: Partial<Provider>) {
    Object.assign(this, props);
  }
}
