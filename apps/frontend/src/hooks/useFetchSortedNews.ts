import { useAppSelector } from 'src/app/hooks';
import { useGetSortedNewsQuery } from 'src/features/news';
import { setQueryOptions } from 'src/utils/query';

export default function useFetchSortedNews() {
  // const [searchParams] = useSearchParams();
  // const date = searchParams.get('date');
  const date = useAppSelector((state) => state.settings.date);
  const queryOptions = setQueryOptions(undefined, date);
  const { data: sortedNews } = useGetSortedNewsQuery(queryOptions, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return sortedNews;
}
