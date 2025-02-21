import { useParams } from 'react-router-dom';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import NewsListDisplay from '../NewsListDisplay/NewsListDisplay';

function ProviderNewsPage() {
  const sortedNews = useFetchSortedNews();
  const { id: providerId = '' } = useParams<{ id: string }>();
  const newsByProviders = sortedNews
    ?.map((category) => category.providers)
    .flat();
  const providerName =
    newsByProviders?.find((provider) => provider.id === providerId)?.name || '';
  const news = newsByProviders?.find(
    (provider) => provider.id === providerId,
  )?.news;
  if (!news?.length) return null;
  return (
    <div>
      <NewsListDisplay
        providerId={providerId}
        providerName={providerName}
        news={news}
      />
    </div>
  );
}

export default ProviderNewsPage;
