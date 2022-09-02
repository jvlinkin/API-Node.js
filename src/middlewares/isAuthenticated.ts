import authjwt from "../config/authjwt";
import {Request, Response, NextFunction} from 'express';
import {Secret, verify} from "jsonwebtoken";

export default function isAuthenticated(req: Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.json({message:'JWT is missing.'});
    }    
    const [,token] = authHeader.split(' ');

    try {
        const secret = authjwt.jwt.secret as Secret;
        const isAValidToken = verify(token, secret);
        if(!isAValidToken){
            return res.json({message:'JWT is invalid.'})
        }

        //Aqui, fazer validação de horário, para verificar se token ainda é válido.

        return next();
    } catch{
        return res.json({message:'JWT Error.'})
    }
}