import { Category } from './category.entity';

describe('Category Entity', () => {
  it('should create a Category instance with the given properties', () => {
    const categoryData = {
      id: '123',
      name: 'Econews',
    };

    const category = new Category(categoryData);

    expect(category.id).toBe(categoryData.id);
    expect(category.name).toBe(categoryData.name);
  });

  it('should allow creating an instance without id', () => {
    const categoryData = {
      name: 'Econews',
    };

    const category = new Category(categoryData);

    expect(category.name).toBe(categoryData.name);
    expect(category.id).toBeUndefined();
  });
});
