import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  selectCategoryByProviderIdOrSlug,
  selectProviderByIdOrSlug,
} from 'src/app/store';
import { useGetAllNewsByProviderQuery } from 'src/features/news';
import { getCategoryColor } from 'src/utils/style';
import NewsList from '../NewsList/NewsList';

function ProviderNewsPage() {
  const { slug: providerSlug = '' } = useParams<{ slug: string }>();
  const category = useAppSelector(
    selectCategoryByProviderIdOrSlug(providerSlug),
  );
  const provider = useAppSelector(selectProviderByIdOrSlug(providerSlug));
  const { data: providerNews } = useGetAllNewsByProviderQuery(
    { providerId: provider?.id },
    { skip: !provider },
  );
  if (!providerNews?.news?.length || !provider) return null;
  return (
    <div>
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
