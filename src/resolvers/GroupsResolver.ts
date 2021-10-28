import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Groups } from "../entity/Groups.";
import { MyContext } from "../MyContext";


@Resolver()
export class GroupsResolver {
    @Query(()=> [Groups])
    async allGroups() {
        return await Groups.find()
    }

    @Mutation(()=>Groups)
    async createGroup(
        @Arg('name') name: string,
        @Arg('type') type: string,
        @Ctx() {payload} : MyContext,
    ){
        const findGroup = Groups.findOne({where: { name }})

        if (name == '') throw new Error('Please enter group name! Group name cannot be empty.')
        if (findGroup) throw new Error('Group name taken. Try another name')
        if (type == '') throw new Error('Please specify group type! Group type cannot be empty.')

        await Groups.insert({
            name,
            type,
            creator: payload
        })
        
    }
}