import { Request, Response } from "express";
import { postRepository } from "../repositories/PostResporitory";




export class PostController {
    
    
    public async show(req: Request, res: Response): Promise<Response>{
        const post = await postRepository.find();
        

        if(!post){
            return res.json({message:'There is no posts.'})
        }

        return res.json(post);
    }


    public async create(req:Request, res: Response): Promise<Response | undefined>{
        console.log(req.body);
        const {text_post, description} = req.body;
        
        

        const post = postRepository.create({
            text_post,
            description
        })
        
        if(!post){
            return res.json({message:'There is no information enough to create the post.'})
        }

        await postRepository.save(post).then(()=>{
            return res.status(201).json({
                message:'Post created successfully.',
                post
            })
        }).catch((err)=>{
            console.log(err)
            return res.json({message:'Internal server error.'})
        })
        
    }
    
}