export class Category {
  id?: string;
  name!: string;

  constructor(props: Partial<Category>) {
    Object.assign(this, props);
  }
}
