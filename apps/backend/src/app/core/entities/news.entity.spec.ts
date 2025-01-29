import { News } from './news.entity';

describe('News Entity', () => {
  it('should create a News instance with the given properties', () => {
    const newsData = {
      id: '123',
      title: 'Facebook est racheté par Google',
      url: 'http://econews.com/facebook-est-rachete-par-google',
    };

    const news = new News(newsData);

    expect(news.id).toBe(newsData.id);
    expect(news.title).toBe(newsData.title);
    expect(news.url).toBe(newsData.url);
  });

  it('should allow partial properties', () => {
    const newsData = {
      title: 'Facebook est racheté par Google',
    };

    const news = new News(newsData);

    expect(news.title).toBe(newsData.title);
    expect(news.id).toBeUndefined();
    expect(news.url).toBeUndefined();
  });
});
