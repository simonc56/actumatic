import { Provider } from './provider.entity';

describe('Provider Entity', () => {
  it('should create a Provider instance with the given properties', () => {
    const providerData = {
      id: '123',
      name: 'Econews',
      url: 'http://econews.com',
    };

    const provider = new Provider(providerData);

    expect(provider.id).toBe(providerData.id);
    expect(provider.name).toBe(providerData.name);
    expect(provider.url).toBe(providerData.url);
  });

  it('should allow partial properties', () => {
    const providerData = {
      name: 'Econews',
    };

    const provider = new Provider(providerData);

    expect(provider.name).toBe(providerData.name);
    expect(provider.id).toBeUndefined();
    expect(provider.url).toBeUndefined();
  });
});
