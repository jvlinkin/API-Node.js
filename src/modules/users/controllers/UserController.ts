import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import {ShowUsersService} from '../services/ShowUsersService';
import {ShowUserService} from '../services/ShowUserService';
import {UpdateUserService } from "../services/UpdateUserService";
import {DeleteUserService} from '../services/DeleteUserService';
import User from "../entities/User";




export class UserController {
    public async show(req:Request, res: Response): Promise<Response>{
        const showUsersService = new ShowUsersService();

        try {
            const users = await showUsersService.execute();
            return res.json(users);
        } catch (error) {
            console.log(error)
            return res.json({message:'Internal server error.'})
            
        }
        
    }

    public async showUser(req:Request, res: Response): Promise<Response>{
        const {id} = req.params;

        const showUserService = new ShowUserService();
        try {
            const userService = await showUserService.execute({id});
            return res.json(userService)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Internal server error.'})
        }

        
    }
    
    
     public async create(req:Request,res:Response): Promise<Response>{
        const {email,password} = req.body;

        const createUserService = new CreateUserService();

        try{
            const userService = await createUserService.execute({
                email,password
            })
            return res.status(201).json({messsage:'User created!'})

        }catch(err){
            console.log(err);
            return res.status(500).json({message:'Internal server error.'});
        }

        
        
        
     }

     public async update(req: Request, res:Response): Promise<Response | undefined>{
        const {id} = req.params;
        const {email, password, newEmail, newPassword} = req.body;

        const updateUserService = new UpdateUserService();

        try {
            const updatedUser = await updateUserService.execute({
                id, email, password, newEmail, newPassword
            })
            return res.json({message:'User updated.',
             updatedUser});
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Internal server error.'});
            
        }


        
     }

     public async delete(req:Request, res: Response): Promise<Response>{
        const {id} = req.params;

        const deleteUserService = new DeleteUserService();

        try {
            const deleteUser = await deleteUserService.execute({id});
            return res.json({message:'User deleted.'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Internal server error.'})
            
        }
        
    
}}