export class News {
  id?: string;
  title!: string;
  url!: string;
  providerId!: string;

  constructor(props: Partial<News>) {
    Object.assign(this, props);
  }
}
