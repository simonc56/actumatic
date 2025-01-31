import { useGetAllNewsByProviderQuery } from 'src/features/news';

type Props = { providerId: string };

function NewsList({ providerId }: Props) {
  const { data: allNews } = useGetAllNewsByProviderQuery({ providerId });
  return (
    <div>
      {allNews?.map((news) => (
        <div key={news.id}>
          <a href={news.url}>{news.title}</a>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
