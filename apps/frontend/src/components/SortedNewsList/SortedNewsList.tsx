import { useGetSortedNewsQuery } from 'src/features/news';
import ProvidersListDisplay from '../ProvidersListDisplay/ProvidersListDisplay';

function SortedNewsList() {
  const { data: sortedNews } = useGetSortedNewsQuery({});
  if (!sortedNews?.length) return null;

  return (
    <main className="sorted-news-list">
      {sortedNews.map((category) => (
        <ProvidersListDisplay
          key={category.id}
          categoryName={category.name}
          newsByProviders={category.providers}
        />
      ))}
    </main>
  );
}

export default SortedNewsList;
