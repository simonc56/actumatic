import { useGetAllNewsByProviderQuery } from 'src/features/news';
import { isoToTimeString } from 'src/utils/datetime';
import './NewsList.scss';

type Props = { providerId: string };

function NewsList({ providerId }: Props) {
  const { data: allNews } = useGetAllNewsByProviderQuery({
    providerId,
    after: new Date().toISOString().split('T')[0],
  });
  return (
    <div className="news-list">
      {allNews?.map((news) => (
        <div className="news-list__item" key={news.id}>
          <span className="news-list__item_time">
            {isoToTimeString(news.createdAt)}
          </span>
          <a href={news.url} target="_blank">
            {news.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
