import { ObjectType, Field} from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity('Groups')
export class Groups extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: string;

    @Field(()=>User)
    @ManyToOne(()=>User, user => user.id)
    creator: User;

    @Field(()=>[User])
    @ManyToMany(()=>User)
    @JoinTable()
    members: User[];
    
}