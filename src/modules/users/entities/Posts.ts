import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from "./User"

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'text'})
    text_post: string

    @Column({type:'text'})
    description: string

    @ManyToMany(()=>User, user => user.posts)
    users: User[]

    @CreateDateColumn({type: 'timestamp with time zone'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updatedAt: Date 
    
}

export default Posts;