import { Router, Request, Response } from "express";
import userRoutes from "../modules/users/routes/userRoutes";
import sessionRoutes from "../modules/users/routes/sessionRoutes";
import postRoutes from "../modules/users/routes/postRoutes";
const routes = Router();


//test route
routes.get('/', (req: Request, res: Response)=>{
    res.json({message:'its working.'})
})

routes.use('/user', userRoutes);
routes.use('/login', sessionRoutes)
routes.use('/post', postRoutes)

export default routes