import { useGetCategoriesQuery } from 'src/features/category';
import ProvidersList from '../ProvidersList/ProvidersList';
import './CategoriesList.scss';

type CategoriesListProps = {
  category: string;
};

function CategoriesList({ category }: CategoriesListProps) {
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
