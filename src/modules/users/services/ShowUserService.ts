import User from "../entities/User";
import { userRepository } from "../repositories/UserRepository"; 

interface IRequest {
    id: string
}

export class ShowUserService {
    public async execute({id}: IRequest):Promise<User>{
        const user = await userRepository.findOne({
            where:{
                id
            }
        })

        if(!user){
            throw Error('User not found.')
        }
        return user;
  
    }

}