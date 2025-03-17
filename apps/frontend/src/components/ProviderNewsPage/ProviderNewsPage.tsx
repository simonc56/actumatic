import { Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  selectCategoryByProviderIdOrSlug,
  selectProviderByIdOrSlug,
} from 'src/app/store';
import useFetchProviderNews from 'src/hooks/useFetchProviderNews';
import { getCategoryColor } from 'src/utils/style';
import FilterBar from '../FilterBar/FilterBar';
import NewsList from '../NewsList/NewsList';

function ProviderNewsPage() {
  const { slug: providerSlug = '' } = useParams<{ slug: string }>();
  const category = useAppSelector(
    selectCategoryByProviderIdOrSlug(providerSlug),
  );
  const provider = useAppSelector(selectProviderByIdOrSlug(providerSlug));
  const providerNews = useFetchProviderNews({ providerId: provider?.id });

  return (
    <div style={{flexGrow: 1}}>
      <FilterBar allowAllTime />
      <br />
      <Container size={1600}>
      {providerNews?.news?.length && provider ? (
        <NewsList
          providerId={provider.id}
          news={providerNews.news}
          color={getCategoryColor(category?.name ?? '')}
          isHeaderWithLink={false}
        />
      ) : null}</Container>
    </div>
  );
}

export default ProviderNewsPage;
