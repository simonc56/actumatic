import { useGetCategoriesQuery } from 'src/features/category';
import ProvidersList from '../ProvidersList/ProvidersList';
import './CategoriesList.scss';

function CategoriesList() {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <main className="categories-list">
      {categories?.map((category) => (
        <ProvidersList key={category.id} category={category} />
      ))}
    </main>
  );
}

export default CategoriesList;
