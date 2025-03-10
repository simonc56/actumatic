import { useGetSortedNewsQuery } from 'src/features/news';
import { setQueryOptions } from 'src/utils/query';

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
