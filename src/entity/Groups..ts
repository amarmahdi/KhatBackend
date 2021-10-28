import { ObjectType, Field} from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Field()
    @OneToOne(()=>User)
    @JoinColumn()
    creator: User;

    @Field(()=>[User])
    @ManyToMany(()=>User)
    @JoinTable()
    members: User[];
    
}