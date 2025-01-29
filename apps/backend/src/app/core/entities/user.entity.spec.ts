import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a User instance with the given properties', () => {
    const userData = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    };

    const user = new User(userData);

    expect(user.id).toBe(userData.id);
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
  });

  it('should allow partial properties', () => {
    const userData = {
      email: 'test@example.com',
    };

    const user = new User(userData);

    expect(user.email).toBe(userData.email);
    expect(user.id).toBeUndefined();
    expect(user.name).toBeUndefined();
  });
});
