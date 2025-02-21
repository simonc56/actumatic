import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import ProvidersListDisplay from '../ProvidersListDisplay/ProvidersListDisplay';

function SortedNewsList() {
  const sortedNews = useFetchSortedNews();
  if (!sortedNews?.length) return null;

  return (
    <>
      {sortedNews.map((category) => (
        <ProvidersListDisplay
          key={category.id}
          categoryName={category.name}
          newsByProviders={category.providers}
        />
      ))}
    </>
  );
}

export default SortedNewsList;
