import * as dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import 'express-async-errors';
import {errors} from 'celebrate'
import { AppDataSource } from '../database/data-source';
import routes from "./routesRedirect";


//config database and express together.
AppDataSource.initialize().then(()=>{
    const app = express();
    app.use(cors()); 
    app.use(express.json());
    app.use(routes);
    app.use(errors());
    

    app.listen(3000, ()=>{
        console.log('Database and server running on port 3000.')
    })

})



