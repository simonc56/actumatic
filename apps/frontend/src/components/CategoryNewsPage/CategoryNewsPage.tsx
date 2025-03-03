import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { selectCategoryByIdOrSlug } from 'src/app/store';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import ProvidersList from '../ProvidersList/ProvidersList';

function CategoryNewsPage() {
  const sortedNews = useFetchSortedNews();
  const { slug: categorySlug = '' } = useParams<{ slug: string }>();
  const category = useAppSelector(selectCategoryByIdOrSlug(categorySlug));
  const newsByProviders = sortedNews?.find(
    (categoryCandidate) => categoryCandidate.categoryId === category.id,
  )?.providers;
  if (!newsByProviders?.length) return null;
  return (
    <div>
      <ProvidersList
        categoryId={category.id}
        newsByProviders={newsByProviders}
      />
    </div>
  );
}

export default CategoryNewsPage;
