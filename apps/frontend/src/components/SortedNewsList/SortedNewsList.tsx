import { useGetSortedNewsQuery } from 'src/features/news';
import ProvidersListDisplay from '../ProvidersListDisplay/ProvidersListDisplay';

function SortedNewsList() {
  const today = new Date().toISOString().split('T')[0];
  const { data: sortedNews } = useGetSortedNewsQuery({ after: today });
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
