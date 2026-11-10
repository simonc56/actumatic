import { useAppSelector } from 'src/app/hooks';
import { useGetAllNewsByProviderQuery } from 'src/features/news';
import { setQueryOptions } from 'src/utils/query';

export default function useFetchProviderNews({
  providerId,
}: {
  providerId: string | undefined;
}) {
  // const [searchParams] = useSearchParams();
  // const date = searchParams.get('date');
  const date = useAppSelector((state) => state.settings.date);
  const queryOptions = setQueryOptions(providerId, date);
  const { data: providerNews } = useGetAllNewsByProviderQuery(queryOptions, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return providerNews;
}
