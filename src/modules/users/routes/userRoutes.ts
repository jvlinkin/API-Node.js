import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {celebrate, Joi, Segments} from 'celebrate';
const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.show)

userRoutes.get('/:id', celebrate({
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

userRoutes.put('/:id', celebrate({
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

userRoutes.delete('/:id', celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().uuid().required()
    }
}),userController.delete)


export default userRoutes;