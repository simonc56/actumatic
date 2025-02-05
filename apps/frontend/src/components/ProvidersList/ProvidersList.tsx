import { ICategory } from 'src/@types/category';
import { useGetProvidersByCategoryQuery } from 'src/features/provider';
import NewsList from '../NewsList/NewsList';
import './ProvidersList.scss';

type ProvidersListProps = {
  category: ICategory;
};

function ProvidersList({ category }: ProvidersListProps) {
  const { data: providers } = useGetProvidersByCategoryQuery(category.id);
  if (!providers?.length) return null;
  return (
    <div className="category">
      <h1 className="category-title">{category.name}</h1>
      {providers?.map((provider) => (
        <div className="provider-list" key={provider.id}>
          <h2>{provider.name}</h2>
          <NewsList providerId={provider.id} />
        </div>
      ))}
    </div>
  );
}

export default ProvidersList;
