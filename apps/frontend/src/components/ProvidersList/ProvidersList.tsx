import { useGetProvidersQuery } from 'src/features/provider';

function ProvidersList() {
  const { data: providers } = useGetProvidersQuery();
  return (
    <div>
      <h1>ProvidersList</h1>
      {providers?.map((provider) => (
        <div key={provider.id}>
          <h2>{provider.name}</h2>
          <a href={provider.url}>{provider.url}</a>
        </div>
      ))}
    </div>
  );
}

export default ProvidersList;
