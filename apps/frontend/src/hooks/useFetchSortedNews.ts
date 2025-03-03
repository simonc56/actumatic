import { useSearchParams } from 'react-router-dom';
import { useGetSortedNewsQuery } from 'src/features/news';

type NewsQueryOptions = {
  begin?: string;
  end?: string;
  filter?: string;
  limit?: number;
};

const setQueryOptions = (date: string): NewsQueryOptions => {
  const options: NewsQueryOptions = {
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

export default function useFetchSortedNews() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const queryOptions = setQueryOptions(date || 'today');
  const { data: sortedNews } = useGetSortedNewsQuery(queryOptions, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return sortedNews;
}
