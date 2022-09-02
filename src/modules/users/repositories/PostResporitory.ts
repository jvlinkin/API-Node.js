import { AppDataSource } from "../../../database/data-source";
import Posts from "../entities/Posts";

export const postRepository = AppDataSource.getRepository(Posts);
