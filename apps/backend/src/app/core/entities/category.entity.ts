import { CreateCategoryDto } from "../../application/dtos/create-category.dto";

export class Category {
  id?: string;
  name!: string;

  constructor(props: Category) {
    Object.assign(this, props);
  }

  // maitriser la création avec une méthode dédiée (éviter de faire new Category dans les use-cases)
  // équivalent à un mapper
  static create(category: CreateCategoryDto): Category {
    return new Category(category);
  }

}
