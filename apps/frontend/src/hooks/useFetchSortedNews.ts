import { useAppSelector } from 'src/app/hooks';
import { useGetSortedNewsQuery } from 'src/features/news';

type NewsQueryOptions = {
  providerId?: string | undefined;
  begin?: string;
  end?: string;
  filter?: string;
  limit?: number;
};

export const setQueryOptions = (
  providerId: string | undefined,
): NewsQueryOptions => {
  const date = useAppSelector((state) => state.settings.date);
  const options: NewsQueryOptions = {};
  if (providerId) {
    options.providerId = providerId;
  }
  if (date === 'today') {
    options.begin = new Date().toISOString().split('T')[0];
  }
  if (date === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    options.begin = yesterday.toISOString().split('T')[0];
    options.end = yesterday.toISOString().split('T')[0] + 'T23:59:59';
  }
  if (date === 'last-week') {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    options.begin = lastWeek.toISOString().split('T')[0];
  }
  return options;
};

export default function useFetchSortedNews() {
  // const [searchParams] = useSearchParams();
  // const date = searchParams.get('date');
  const queryOptions = setQueryOptions(undefined);
  const { data: sortedNews } = useGetSortedNewsQuery(queryOptions, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return sortedNews;
}
