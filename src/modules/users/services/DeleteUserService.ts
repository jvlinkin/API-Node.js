import User from "../entities/User";
import { userRepository } from "../repositories/UserRepository";

interface IRequest {
    id: string
}

export class DeleteUserService {
    public async execute({id}: IRequest):Promise<void>{

        const user = await userRepository.findOne({
            where:{
                id
            }
        })
        if(!user){
            throw Error('User not found.')
        }

        await userRepository.remove(user);
  
    }

}