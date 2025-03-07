import { useAppSelector } from 'src/app/hooks';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import FilterBar from '../FilterBar/FilterBar';
import ProvidersList from '../ProvidersList/ProvidersList';

function SortedNewsList() {
  const date = useAppSelector((state) => state.settings.date);
  const sortedNews = useFetchSortedNews(date);

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
