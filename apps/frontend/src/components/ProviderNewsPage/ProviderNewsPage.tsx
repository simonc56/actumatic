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
  const date = useAppSelector((state) => state.settings.date);
  const category = useAppSelector(
    selectCategoryByProviderIdOrSlug(providerSlug),
  );
  const provider = useAppSelector(selectProviderByIdOrSlug(providerSlug));
  const providerNews = useFetchProviderNews(provider?.id, date);

  if (!providerNews?.news?.length || !provider) return null;
  return (
    <div>
      <FilterBar />
      <br />
      <NewsList
        providerId={provider.id}
        news={providerNews.news}
        color={getCategoryColor(category?.name ?? '')}
        isHeaderWithLink={false}
      />
    </div>
  );
}

export default ProviderNewsPage;
