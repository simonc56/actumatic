import { CreateCategoryDto } from '../../application/dtos/create-category.dto';

export class Category {
  id?: string;
  name!: string;
  slug!: string;

  constructor(props: Category) {
    Object.assign(this, props);
  }

  // maitriser la création avec une méthode dédiée (éviter de faire new Category dans les use-cases)
  // équivalent à un mapper
  static create(category: CreateCategoryDto): Category {
    return new Category(category);
  }
}

export type CategoriesAndProviders = {
  categories: {
    id: string;
    name: string;
    slug: string;
    providers: {
      id: string;
      name: string;
      slug: string;
      url: string;
    }[];
  }[];
};
