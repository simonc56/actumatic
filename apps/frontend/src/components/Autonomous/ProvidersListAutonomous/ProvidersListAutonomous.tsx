import { ICategory } from 'src/@types/category';
import { useGetProvidersByCategoryQuery } from 'src/features/provider';
import NewsListAutonomous from '../NewsListAutonomous/NewsListAutonomous';
import './ProvidersListAutonomous.scss';

type ProvidersListProps = {
  category: ICategory;
};

function ProvidersListAutonomous({ category }: ProvidersListProps) {
  const { data: providers } = useGetProvidersByCategoryQuery(category.id);
  if (!providers?.length) return null;
  return (
    <div className="category">
      <h1 className="category-title">{category.name}</h1>
      {providers?.map((provider) => (
        <NewsListAutonomous provider={provider} key={provider.id} />
      ))}
    </div>
  );
}

export default ProvidersListAutonomous;
