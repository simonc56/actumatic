import { SegmentedControl, TextInput } from '@mantine/core';
import useFetchSortedNews from 'src/hooks/useFetchSortedNews';
import useGetDate from 'src/hooks/useGetDate';
import ProvidersList from '../ProvidersList/ProvidersList';

function SortedNewsList() {
  const sortedNews = useFetchSortedNews();
  const date = useGetDate();
  if (!sortedNews?.length) return null;

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxHeight: '40px',
        }}
      >
        <SegmentedControl
          withItemsBorders={false}
          radius="md"
          data={["Aujourd'hui", 'Hier', 'Tout']}
        />
        <p>{date}</p>
        <TextInput radius="md" placeholder="Filtre" />
      </div>
      {sortedNews.map((category) => (
        <ProvidersList
          categoryId={category.categoryId}
          key={category.categoryId}
          newsByProviders={category.providers}
        />
      ))}
    </>
  );
}

export default SortedNewsList;
