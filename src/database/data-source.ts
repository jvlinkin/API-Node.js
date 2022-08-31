import { DataSource } from "typeorm"
import 'reflect-metadata';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["**/entities/*.ts"],
    migrations: ["**/migrations/*.ts"],
})
