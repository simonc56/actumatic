import { useSearchParams } from 'react-router-dom';
import { useGetSortedNewsQuery } from 'src/features/news';

type NewsQueryOptions = {
  after?: string;
  before?: string;
  filter?: string;
  limit?: number;
};

const setQueryOptions = (date: string): NewsQueryOptions => {
  const options: NewsQueryOptions = {
    after: new Date().toISOString().split('T')[0],
  };
  if (date === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    options.after = yesterday.toISOString().split('T')[0];
    options.before = new Date().toISOString().split('T')[0];
  }
  if (date === 'last-week') {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    options.after = lastWeek.toISOString().split('T')[0];
  }
  if (date === 'all-time') {
    options.after = undefined;
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
