import { useGetAllNewsByProviderQuery } from 'src/features/news';

type Props = { providerId: string };

function NewsList({ providerId }: Props) {
  const { data: allNews } = useGetAllNewsByProviderQuery({ providerId });
  return (
    <div>
      {allNews?.map((news) => (
        <div key={news.id}>
          <h3>{news.title}</h3>
          <a href={news.url}>{news.url}</a>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
