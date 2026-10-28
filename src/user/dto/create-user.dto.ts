import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;
    userID: string;

    @IsEmail()
    email: string;
}