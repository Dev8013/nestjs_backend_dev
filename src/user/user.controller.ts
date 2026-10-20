import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('user')
export class UserController {
    //GET /user
    @Get()
    getUsers(@Query('name') name: string) {
        const users =  [
            {id: 1, userID: "23BDO10001", name: "Gurshan"},
            {id: 2, userID: "23BDO10025", name: "Dev"},
            {id: 3, userID: "23BDO10003", name: "Saxsam"}
        ];

        if(name) {
            return users.filter((user) => 
            user.name.toLowerCase() === name.toLowerCase());
        }
        return users;
    }
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

}
