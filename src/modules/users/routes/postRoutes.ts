import { Router } from "express";
import { PostController } from "../controllers/PostController";
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "../../../middlewares/isAuthenticated";
const postRoutes = Router();
const postController = new PostController();


postRoutes.get('/',isAuthenticated, postController.show);

postRoutes.post('/', isAuthenticated,celebrate({
    [Segments.BODY]:{
    text_post: Joi.string().required(),
    description: Joi.string().required()
    }
}),
postController.create)


export default postRoutes;