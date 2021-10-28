import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";

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

    @Field(()=>Token)
    @OneToOne(()=>Token, token => token.id)
    @JoinColumn()
    token: Token;

}

@ObjectType()
@Entity("Token")
export class Token extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;
}
