import { Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { selectCategoryByIdOrSlug } from 'src/app/store';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import FilterBar from '../FilterBar/FilterBar';
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
      <div style={{flexGrow: 1}}>
        <FilterBar allowAllTime />
        <Container size={1600}>
        <ProvidersList
          isHeaderWithLink={false}
          categoryId={category.id}
          newsByProviders={newsByProviders}
        />
        </Container>
      </div>
  );
}

export default CategoryNewsPage;
