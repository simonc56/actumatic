import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { selectCategoryByIdOrSlug } from 'src/app/store';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import useGetDate from 'src/hooks/useGetDate';
import FilterBar from '../FilterBar/FilterBar';
import ProvidersList from '../ProvidersList/ProvidersList';

function CategoryNewsPage() {
  const sortedNews = useFetchSortedNews();
  const date = useGetDate();
  const { slug: categorySlug = '' } = useParams<{ slug: string }>();
  const category = useAppSelector(selectCategoryByIdOrSlug(categorySlug));
  const newsByProviders = sortedNews?.find(
    (categoryCandidate) => categoryCandidate.categoryId === category.id,
  )?.providers;
  if (!newsByProviders?.length) return null;
  return (
    <>
      <FilterBar />
      <ProvidersList
        categoryId={category.id}
        newsByProviders={newsByProviders}
      />
    </>
  );
}

export default CategoryNewsPage;
