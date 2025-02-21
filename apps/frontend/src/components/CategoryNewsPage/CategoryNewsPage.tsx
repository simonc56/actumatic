import { useParams } from 'react-router-dom';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import ProvidersListDisplay from '../ProvidersListDisplay/ProvidersListDisplay';

function CategoryNewsPage() {
  const sortedNews = useFetchSortedNews();
  const { id: categoryId = '' } = useParams<{ id: string }>();
  const categoryName =
    sortedNews?.find((category) => category.id === categoryId)?.name || '';
  const newsByProviders = sortedNews?.find(
    (category) => category.id === categoryId,
  )?.providers;
  if (!newsByProviders?.length) return null;
  return (
    <div>
      <ProvidersListDisplay
        categoryName={categoryName}
        newsByProviders={newsByProviders}
      />
    </div>
  );
}

export default CategoryNewsPage;
