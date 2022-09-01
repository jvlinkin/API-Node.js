import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import {celebrate, Joi, Segments} from 'celebrate';
import { appendFile } from "fs";
import isAuthenticated from "../../../middlewares/isAuthenticated";
const sessionRoutes = Router();
const sessionController = new SessionController()


sessionRoutes.post('/', celebrate({
    [Segments.BODY]:{
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
  }),sessionController.login);

export default sessionRoutes;