import { Router, Request, Response } from "express";
import userRoutes from "../modules/users/routes/userRoutes";
const routes = Router();


//test route
routes.get('/', (req: Request, res: Response)=>{
    res.json({message:'its working.'})
})

routes.use('/user', userRoutes);

export default routes