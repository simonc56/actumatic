import { useGetAllNewsByProviderQuery } from 'src/features/news';
import { setQueryOptions } from 'src/utils/query';

export default function useFetchProviderNews({
  providerId,
}: {
  providerId: string | undefined;
}) {
  // const [searchParams] = useSearchParams();
  // const date = searchParams.get('date');
  const queryOptions = setQueryOptions(providerId);
  const { data: providerNews } = useGetAllNewsByProviderQuery(queryOptions, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return providerNews;
}
