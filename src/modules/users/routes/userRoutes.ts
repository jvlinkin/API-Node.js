import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "../../../middlewares/isAuthenticated";
import { isatty } from "tty";
const userRoutes = Router();
const userController = new UserController();


userRoutes.get('/',isAuthenticated, userController.show)

userRoutes.get('/:id', isAuthenticated ,celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().uuid().required()
    }
}), userController.showUser)

userRoutes.post('/', celebrate({
    [Segments.BODY]:{
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmpassword: Joi.string().required().valid(Joi.ref('password'))
    }
}),
userController.create)

userRoutes.put('/:id',isAuthenticated, celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]:{
        email: Joi.string().email().required(),
        password:Joi.string().required(),
        newEmail: Joi.string().email().required(),
        newPassword:Joi.string().required()
    }
}),userController.update)

userRoutes.delete('/:id',isAuthenticated, celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().uuid().required()
    }
}),userController.delete)


export default userRoutes;