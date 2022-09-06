import User from "../entities/User";
import { userRepository } from "../repositories/UserRepository";
import {compare} from 'bcrypt';
import {Secret, sign} from 'jsonwebtoken';
import authjwt from "../../../config/authjwt";

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    userExists: User,
    token: string
}


 class LoginUserService{

   public async execute({email, password}: IRequest): Promise<IResponse>{
        
   

    const userExists = await userRepository.findOne({
        where:{email}
    })

    if(!userExists){
        throw new Error('User not found.')
    }

    const checkPassword = await compare(password, userExists.password)
    if(checkPassword === false){
        throw new Error('Password incorrect.')
    }

    const secret = process.env.APP_SECRET as Secret;

    const token = sign({}, secret, {
        subject:userExists.id,
        expiresIn: authjwt.jwt.expiresIn
    });

    return {userExists, token};
    
    
    

    

    }
}

export default LoginUserService;



