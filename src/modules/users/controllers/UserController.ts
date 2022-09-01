import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import {compare, genSalt, hash} from 'bcrypt';




interface IUpdateRequest {
    email: string,
    password: string,
    newEmail: string,
    newPassword: string
}



export class UserController {
    public async show(req:Request, res: Response): Promise<Response>{
        const user = await userRepository.find()
        if(!user){            
            res.status(404).json({message:'No users found.'})
        }
        return res.json(user);
    }

    public async showUser(req:Request, res: Response): Promise<Response>{
        const {id} = req.params;

        const user = await userRepository.findOne({
            where:{
                id
            }
        })
        if(!user){
            return res.status(404).json({message:'User not found.'})
        }

        return res.json(user);
    }
    
    
     public async create(req:Request,res:Response): Promise<Response | undefined>{
        const {email,password} = req.body;
        
        const userExists = await userRepository.findOne({
            where:{
                email
            }
        })
        if(userExists){
            return res.json({message: 'user already exists.'})
        }

        const salt = await genSalt(15)
        const hashedPassword = await hash(password, salt)
        
        const user = userRepository.create({
            email,
            password:hashedPassword
        })
        

        await userRepository.save(user).then(()=>{
            return res.status(201).json(user)
        }).catch((err)=>{
            return res.status(500).json({message:'Internal server error.'})
        })

        
        
     }

     public async update(req: Request, res:Response): Promise<Response | undefined>{
        const {id} = req.params;
        const {email, password, newEmail, newPassword}: IUpdateRequest = req.body;

        const user = await userRepository.findOne({
            where:{
                id
            }
        })
        if(!user){
            return res.status(404).json({message:'User not found.'})
        }

        const userEmail = await userRepository.findOne({
            where:{
                email
            }
        })
        if(!userEmail){
            return res.status(404).json({message:'Email does not exists.'})
        }

        if(userEmail.id != user.id){
            return res.json({message:'ID incorrect.'})
        }
        

        const checkPass = await compare(password, user.password);

        if(!checkPass){
            return res.json({message:'Password incorrect.'})
        }


        const salt = await genSalt(15)
        const hashedPassword = await hash(newPassword, salt)
        user.email = newEmail
        user.password = hashedPassword


        await userRepository.save(user).then(()=>{
            return res.json({message:'User updated.'})
        }).catch((err)=>{
            console.log(err)
            return res.json({message:'Internal server error.'})
        })

        
     }

     public async delete(req:Request, res: Response): Promise<Response>{
        const {id} = req.params;

        const user = await userRepository.findOne({
            where:{
                id
            }
        })
        if(!user){
            return res.json({message:'User not found.'})
        }else{
            await userRepository.remove(user);
            return res.json({message:'User excluded.'})
        }
     }
    
}