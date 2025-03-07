import { useGetAllNewsByProviderQuery } from 'src/features/news';

type NewsQueryOptions = {
  providerId: string | undefined;
  begin?: string;
  end?: string;
  filter?: string;
  limit?: number;
};

const setQueryOptions = (
  providerId: string | undefined,
  date: string,
): NewsQueryOptions => {
  const options: NewsQueryOptions = {
    providerId,
    begin: new Date().toISOString().split('T')[0],
  };
  if (date === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    options.begin = yesterday.toISOString().split('T')[0];
    options.end = new Date().toISOString().split('T')[0];
  }
  if (date === 'last-week') {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    options.begin = lastWeek.toISOString().split('T')[0];
  }
  if (date === 'all-time') {
    options.begin = undefined;
  }
  return options;
};

export default function useFetchProviderNews(
  providerId: string | undefined,
  date: string,
) {
  // const [searchParams] = useSearchParams();
  // const date = searchParams.get('date');
  const queryOptions = setQueryOptions(providerId, date || 'today');
  const { data: providerNews } = useGetAllNewsByProviderQuery(queryOptions, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return providerNews;
}
