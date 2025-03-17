import { Container } from '@mantine/core';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import FilterBar from '../FilterBar/FilterBar';
import ProvidersList from '../ProvidersList/ProvidersList';

function SortedNewsList() {
  const sortedNews = useFetchSortedNews();

  return (
      <div style={{flexGrow: 1}}>
        <FilterBar />
        <Container size={1600}>
          {sortedNews?.length
            ? sortedNews.map((category) => (
                <ProvidersList
                  categoryId={category.categoryId}
                  key={category.categoryId}
                  newsByProviders={category.providers}
                />
              ))
            : null}
        </Container>
      </div>
  );
}

export default SortedNewsList;
