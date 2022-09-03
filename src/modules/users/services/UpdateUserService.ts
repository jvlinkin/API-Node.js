import { compare, genSalt, hash } from "bcrypt";
import User from "../entities/User";
import { userRepository } from "../repositories/UserRepository"; 

interface IRequest {
    id: string
    email: string,
    password: string
    newEmail: string,
    newPassword: string
}

export class UpdateUserService {
    public async execute({id,email, password, newEmail, newPassword}: IRequest):Promise<User>{

        const user = await userRepository.findOne({
            where:{
                id
            }
        })
        if(!user){
            throw Error('User not found.')
        }

        const userEmail = await userRepository.findOne({
            where:{
                email
            }
        })
        if(!userEmail){
            throw Error('Email does not exists.')
        }

        if(userEmail.id != user.id){
            throw Error('ID incorrect.')
        }
        

        const checkPass = await compare(password, user.password);

        if(!checkPass){
            throw Error('Password incorrect.')
        }


        const salt = await genSalt(15)
        const hashedPassword = await hash(newPassword, salt)
        user.email = newEmail
        user.password = hashedPassword


        await userRepository.save(user)
        return user;    

    }

}