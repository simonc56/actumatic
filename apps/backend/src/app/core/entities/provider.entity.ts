import { CreateProviderDto } from '../../application/dtos/create-provider.dto';

export class Provider {
  id?: string;
  name!: string;
  url!: string;
  feedUrl!: string;
  feedType!: string;
  categoryId!: string;

  constructor(props: Provider) {
    Object.assign(this, props);
  }

  static create(provider: CreateProviderDto): Provider {
    return new Provider(provider);
  }
}
