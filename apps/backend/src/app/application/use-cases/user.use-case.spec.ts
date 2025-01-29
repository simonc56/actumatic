import {
  CreateUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
} from './user.use-case';
import { IUserRepository } from '../ports/user-repository.port';
import { User } from '../../core/entities/user.entity';

describe('UserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getUsersUseCase: GetUsersUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn(),
    };
    createUserUseCase = new CreateUserUseCase(userRepository);
    getUserUseCase = new GetUserUseCase(userRepository);
    getUsersUseCase = new GetUsersUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    const mockUser = new User({ ...userData, id: 'some-id' });
    userRepository.save.mockResolvedValue(mockUser);

    const user = await createUserUseCase.execute(userData);

    expect(user).toEqual(mockUser);
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
  });

  it('should return a user when a valid id is provided', async () => {
    const mockUser = new User({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    userRepository.findById.mockResolvedValue(mockUser);

    const user = await getUserUseCase.execute('1');

    expect(user).toEqual(mockUser);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should return null when a user with the given id does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    const user = await getUserUseCase.execute('non-existent-id');

    expect(user).toBeNull();
    expect(userRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });

  it('should return an array of users', async () => {
    const mockUsers: User[] = [
      new User({ id: '1', name: 'John Doe', email: 'john.doe@example.com' }),
      new User({ id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' }),
    ];
    userRepository.findAll.mockResolvedValue(mockUsers);

    const users = await getUsersUseCase.execute();

    expect(users).toEqual(mockUsers);
    expect(userRepository.findAll).toHaveBeenCalled();
  });

  it('should return an empty array if no users exist', async () => {
    userRepository.findAll.mockResolvedValue([]);

    const users = await getUsersUseCase.execute();

    expect(users).toEqual([]);
    expect(userRepository.findAll).toHaveBeenCalled();
  });
});
