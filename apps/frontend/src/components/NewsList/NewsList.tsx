import { useGetAllNewsQuery } from 'src/features/news';

type Props = { providerId: string };

function NewsList({ providerId }: Props) {
  const { data: allNews } = useGetAllNewsQuery();
  return (
    <div>
      {allNews?.map((news) => (
        <div key={news.id}>
          <h2>{news.title}</h2>
          <a href={news.url}>{news.url}</a>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
