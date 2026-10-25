import { Injectable } from '@nestjs/common';
import { LoggerService } from './user.logger.js';

interface User {
    id: number;
    userID: string;
    name: string;
}
//implement all crudfunctionalities in this service class
//find all user, done
//find one user, done
//create user, --
//delete user, --

@Injectable()
export class UserService {
    //defined static data for now, later we can replace it with database
    constructor(private readonly Logger: LoggerService) {}
    private users: User[] = [
        {id: 1, userID: "23BDO10001", name: "Gurshan"},
        {id: 2, userID: "23BDO10025", name: "Dev"},
        {id: 3, userID: "23BDO10003", name: "Saxsam"}
    ];

    findAllUsers(name: string = '') {
        this.Logger.log('Fetching all users');
        return this.users.filter((user) => 
        user.name.toLocaleLowerCase().includes(name.toLowerCase()));
    }
    findOneUser(id: number) {
        this.Logger.log(`Fetching user with id: ${id}`);
        return this.users.find((user) => user.id === id);
    }
    createUser(name: string, userID: string, id: number) {
        this.Logger.log(`Creating user with id: ${name}`);
        const newUser: User = {
            name: name,
            userID: userID,
            id: id
        }
        return this.users.push(newUser);
    }
    deleteUser(userID : number) {
        this.Logger.log(`Deleting user with id: ${userID}`);
        const user = this.findOneUser(userID);
        if (user) {
            this.users = this.users.filter((u) => u.id !== userID);
        }
    }
}
