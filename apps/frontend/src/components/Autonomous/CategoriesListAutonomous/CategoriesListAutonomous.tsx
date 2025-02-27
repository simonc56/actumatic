import { useGetCategoriesQuery } from 'src/features/category';
import ProvidersListAutonomous from '../ProvidersListAutonomous/ProvidersListAutonomous';

function CategoriesListAutonomous() {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <main className="categories-list">
      {categories?.map((category) => (
        <ProvidersListAutonomous key={category.id} category={category} />
      ))}
    </main>
  );
}

export default CategoriesListAutonomous;
