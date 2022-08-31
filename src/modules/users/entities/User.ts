import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn({type: 'timestamp with time zone'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updatedAt: Date 
    
}

export default User;