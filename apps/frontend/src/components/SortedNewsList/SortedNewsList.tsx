import { Container } from '@mantine/core';
import { useGetSortedNewsQuery } from 'src/features/news';
import ProvidersListDisplay from '../ProvidersListDisplay/ProvidersListDisplay';

function SortedNewsList() {
  const today = new Date().toISOString().split('T')[0];
  const { data: sortedNews } = useGetSortedNewsQuery(
    { after: today },
    { refetchOnFocus: true, refetchOnReconnect: true },
  );
  if (!sortedNews?.length) return null;

  return (
    <Container>
      {sortedNews.map((category) => (
        <ProvidersListDisplay
          key={category.id}
          categoryName={category.name}
          newsByProviders={category.providers}
        />
      ))}
    </Container>
  );
}

export default SortedNewsList;
