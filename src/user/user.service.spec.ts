import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service.js';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: LoggerService,
          useValue: { log: vi.fn() },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates and returns a user with the next available id', () => {
    const dto: CreateUserDto = {
      name: 'Alex',
      userID: '23BDO10010',
      email: 'alex@example.com',
    };

    expect(service.createUser(dto)).toEqual({
      id: 4,
      ...dto,
    });
  });

  it('updates an existing user', () => {
    expect(service.updateUser(1, { name: 'Updated name' })).toMatchObject({
      id: 1,
      name: 'Updated name',
    });
  });

  it('deletes and returns an existing user', () => {
    expect(service.deleteUser(1)).toMatchObject({ id: 1 });
    expect(service.findAllUsers()).toHaveLength(2);
  });

  it('throws when a user does not exist', () => {
    expect(() => service.findOneUser(99)).toThrow(NotFoundException);
    expect(() => service.updateUser(99, { name: 'Missing' })).toThrow(NotFoundException);
    expect(() => service.deleteUser(99)).toThrow(NotFoundException);
  });
});
