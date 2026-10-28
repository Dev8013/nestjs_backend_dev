import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface User {
    id: number;
    userID: string;
    name: string;
    email: string;
}
@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        {id: 1, userID: "23BDO10001", name: "Gurshan", email: "gurshan@example.com"},
        {id: 2, userID: "23BDO10025", name: "Dev", email: "dev@example.com"},
        {id: 3, userID: "23BDO10003", name: "Saxsam", email: "saxsam@example.com"}
    ];

    findAllUsers(name: string = '') {
        this.logger.log('Fetching all users');
        return this.users.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase()));
    }

    findOneUser(id: number) {
        this.logger.log(`Fetching user`);
        const user = this.users.find((user) => user.id === id);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    createUser(dto: CreateUserDto) {
        this.logger.log('Creating user');
        const newUser: User = {
            id: Math.max(0, ...this.users.map((user) => user.id)) + 1,
            ...dto
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, dto: UpdateUserDto) {
        this.logger.log(`Updating user with id: ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        this.users[index] = {...this.users[index], ...dto};
        return this.users[index];
    }

    deleteUser(id: number) {
        this.logger.log(`Deleting user with id: ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const [deletedUser] = this.users.splice(index, 1);
        return deletedUser;
    }
}
