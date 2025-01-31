import { useGetProvidersQuery } from 'src/features/provider';
import NewsList from '../NewsList/NewsList';

function ProvidersList() {
  const { data: providers } = useGetProvidersQuery();
  return (
    <div>
      <h1>ProvidersList</h1>
      {providers?.map((provider) => (
        <div key={provider.id}>
          <h2>{provider.name}</h2>
          <a href={provider.url}>{provider.url}</a>
          <NewsList providerId={provider.id} />
        </div>
      ))}
    </div>
  );
}

export default ProvidersList;
