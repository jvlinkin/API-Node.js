import { Request, Response } from "express";
import { postRepository } from "../repositories/PostResporitory";
import ShowPostsService from "../services/ShowPostsService";
import CreatePostService from "../services/CreatePostService";
import { json } from "stream/consumers";




export class PostController {
    
    
    public async show(req: Request, res: Response): Promise<Response>{

        //CALL SERVICE
       const showPostsService = new ShowPostsService();

       try {
        const posts = await showPostsService.execute();

        return res.json(posts);
       } catch (error) {
        console.log(error)
        
        return res.json({message:'Internal server error.'})
        
       }

       
    }


    public async create(req:Request, res: Response): Promise<Response | undefined>{
        
        const {text_post, description} = req.body;

        const createPostService = new CreatePostService();

        try{
            const post = await createPostService.execute({text_post, description})
            return res.json({
                message:'Post created!',
                post
            })

        } catch(err){
            console.log(err)
            return res.json({message:'Internal server error.'})

        }
        

    
        
    }

    //Update POST,
    //Delete POST;
    
}