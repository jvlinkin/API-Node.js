import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Posts from "./Posts"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToMany(()=> Posts, posts => posts.users)
    @JoinTable({
        name:'user_post',
        joinColumn:{
            name:'user_id',
            referencedColumnName:'id'
        },
        inverseJoinColumn:{
            name:'post_id',
            referencedColumnName:'id'
        }
    })
    posts: Posts[]

    @CreateDateColumn({type: 'timestamp with time zone'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updatedAt: Date 
    
}

export default User;