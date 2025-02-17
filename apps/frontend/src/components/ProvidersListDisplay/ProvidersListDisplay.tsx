import NewsListDisplay from '../NewsListDisplay/NewsListDisplay';
import './ProvidersListDisplay.scss';

type ProvidersListProps = {
  categoryName: string;
  newsByProviders: {
    id: string;
    name: string;
    news: {
      id: string;
      title: string;
      url: string;
      createdAt: string;
    }[];
  }[];
};

function ProvidersListDisplay({
  categoryName,
  newsByProviders,
}: ProvidersListProps) {
  if (!newsByProviders?.length) return null;
  return (
    <div className="category">
      <h1 className="category-title">{categoryName}</h1>
      {newsByProviders.map((provider) => (
        <NewsListDisplay
          providerName={provider.name}
          key={provider.id}
          news={provider.news}
        />
      ))}
    </div>
  );
}

export default ProvidersListDisplay;
