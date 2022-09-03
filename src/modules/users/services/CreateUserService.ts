import { genSalt, hash } from "bcrypt";
import User from "../entities/User";
import { userRepository } from "../repositories/UserRepository"; 

interface IRequest {
    email: string,
    password: string
}

export class CreateUserService {
    public async execute({email, password}: IRequest):Promise<User>{

        const userExists = await userRepository.findOne({
            where:{
                email
            }
        })

        if(userExists){
            //Escrever um error handling.
            throw Error('User already exists.')
            
        }

        
        const salt = await genSalt(15)
        const hashedPassword = await hash(password, salt)
        
        const user = userRepository.create({
        email,
        password:hashedPassword            
        })

        await userRepository.save(user)
        return user;
        

        
        

    }

}