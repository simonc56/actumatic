import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import useGetDate from 'src/hooks/useGetDate';
import FilterBar from '../FilterBar/FilterBar';
import ProvidersList from '../ProvidersList/ProvidersList';

function SortedNewsList() {
  const sortedNews = useFetchSortedNews();
  const date = useGetDate();
  if (!sortedNews?.length) return null;

  return (
    <>
      <FilterBar />
      {sortedNews.map((category) => (
        <ProvidersList
          categoryId={category.categoryId}
          key={category.categoryId}
          newsByProviders={category.providers}
        />
      ))}
    </>
  );
}

export default SortedNewsList;
