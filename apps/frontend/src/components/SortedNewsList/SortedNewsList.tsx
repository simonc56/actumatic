import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import useGetDate from 'src/hooks/useGetDate';
import ProvidersListDisplay from '../ProvidersListDisplay/ProvidersListDisplay';

function SortedNewsList() {
  const sortedNews = useFetchSortedNews();
  const date = useGetDate();
  if (!sortedNews?.length) return null;

  return (
    <>
      <p>{date}</p>
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
