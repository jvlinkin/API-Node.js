import { postRepository } from "../repositories/PostResporitory";
import { ShowUserService } from "./ShowUserService";

class ShowPostService{
   public async execute(){
        const post = await postRepository.find();      
    
        if(!post){
            return console.log(new Error ("There is no posts."))
        }
        
        return post;
    }
}

export default ShowPostService;



