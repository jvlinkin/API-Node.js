import Posts from "../entities/Posts";
import { postRepository } from "../repositories/PostResporitory";

interface IRequest {
    text_post: string
    description: string
}


class CreatePostService{
   public async execute({text_post, description}: IRequest): Promise<Posts>{
        
     

    const post = postRepository.create({
        text_post,
        description
    })
    
    if(!post){
        throw new Error('There is no information enough to create the post.')
    }

    await postRepository.save(post)
    return post;


    }
}

export default CreatePostService;



