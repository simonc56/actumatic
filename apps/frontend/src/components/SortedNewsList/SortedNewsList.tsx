import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import FilterBar from '../FilterBar/FilterBar';
import ProvidersList from '../ProvidersList/ProvidersList';

function SortedNewsList() {
  const sortedNews = useFetchSortedNews();

  return (
    <>
      <FilterBar />
      {sortedNews?.length
        ? sortedNews.map((category) => (
            <ProvidersList
              categoryId={category.categoryId}
              key={category.categoryId}
              newsByProviders={category.providers}
            />
          ))
        : null}
    </>
  );
}

export default SortedNewsList;
