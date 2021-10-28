import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToMany, JoinTable} from "typeorm";
import { Groups } from "./Groups.";
@ObjectType()
@Entity("Users")
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    password: string;
}

@ObjectType()
@Entity("Tokens")
export class Tokens extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Field()
    @Column()
    userId: string;

    @Field()
    @Column()
    token: string;
}

@ObjectType()
export class LoginRespose{
    @Field()
    accessToken: string;
}
