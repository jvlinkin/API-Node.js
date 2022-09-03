import { genSalt, hash } from "bcrypt";
import User from "../entities/User";
import { userRepository } from "../repositories/UserRepository"; 

interface IRequest {
    email: string,
    password: string
}

export class ShowUsersService {
    public async execute():Promise<User[]>{
        const users = await userRepository.find()
        return users;
    }

}