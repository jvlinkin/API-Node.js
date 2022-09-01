import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import {compare} from 'bcrypt';
import {Secret, sign} from 'jsonwebtoken';
import authjwt from "../../../config/authjwt";



export class SessionController {
    
    
    public async login(req:Request, res: Response): Promise<Response>{
        const {email, password} = req.body;
        const secret = process.env.APP_SECRET as Secret;

        const userExists = await userRepository.findOne({
            where:{email}
        })

        if(!userExists){
            return res.status(404).json({message:'User not found.'})
        }

        const checkPassword = await compare(password, userExists.password)
        if(checkPassword === false){
            return res.json({message:'Password incorrect.'})
        }

        const token = sign({}, secret, {
            subject:userExists.id,
            expiresIn: authjwt.jwt.expiresIn
        });
        
        return res.json({
            message:'Logado!',
            token: token
        })

    }
    
}