import { Body, Controller, Get, Param, Query, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} //Dependency Injection
    //GET /user
    //static data
    @Get()
    getUsers(@Query('name') name: string): unknown {
        // const users =  [
        //     {id: 1, userID: "23BDO10001", name: "Gurshan"},
        //     {id: 2, userID: "23BDO10025", name: "Dev"},
        //     {id: 3, userID: "23BDO10003", name: "Saxsam"}
        // ];

        // if(name) {
        //     return users.filter((user) => 
        //     user.name.toLowerCase() === name.toLowerCase());
        // }
        // return users;
        return this.userService.findAllUsers(name);
    }
    //dynamic data
    @Get(':id')
    getUserById(@Param('id') id: string) {
        return {id: id, userID: "23BDO10001", name: "Gurshan"};
    }
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return {
            data: CreateUserDto,
            message: "User created successfully"
        }
    }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return {
        data: {id, ...updateUserDto},
        message: "User updated successfully"
        }    
    
    }
}
