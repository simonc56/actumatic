import { Provider } from './provider.entity';

describe('Provider Entity', () => {
  it('should create a Provider instance with the given properties', () => {
    const providerData = {
      id: '123',
      name: 'Econews',
      slug: 'econews',
      url: 'http://econews.com',
      feedUrl: 'http://econews.com/feed',
      feedType: 'RSS2',
      categoryId: '123-456',
    };

    const provider = new Provider(providerData);

    expect(provider.id).toBe(providerData.id);
    expect(provider.name).toBe(providerData.name);
    expect(provider.url).toBe(providerData.url);
    expect(provider.feedUrl).toBe(providerData.feedUrl);
    expect(provider.feedType).toBe(providerData.feedType);
  });

  it('should allow creating an instance without id', () => {
    const providerData = {
      name: 'Econews',
      slug: 'econews',
      url: 'http://econews.com',
      feedUrl: 'http://econews.com/feed',
      feedType: 'RSS2',
      categoryId: '123-456',
    };

    const provider = new Provider(providerData);

    expect(provider.name).toBe(providerData.name);
    expect(provider.url).toBe(providerData.url);
    expect(provider.feedUrl).toBe(providerData.feedUrl);
    expect(provider.feedType).toBe(providerData.feedType);
    expect(provider.id).toBeUndefined();
  });
});
