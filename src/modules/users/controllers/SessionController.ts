import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import {compare} from 'bcrypt';
import {Secret, sign} from 'jsonwebtoken';
import authjwt from "../../../config/authjwt";
import LoginUserService from "../services/LoginUserService";




export class SessionController {
    
    
    public async login(req:Request, res: Response): Promise<Response>{
        const {email, password} = req.body;

        const loginUserService = new LoginUserService();

        try {
            const user = await loginUserService.execute({email,password});
            
            return res.json({message:'Logged!', user});
        } catch (error) {
            console.log(error)
            
            return res.json({message:'Internal server error.'})
            
        }
        
        

    }
    
}