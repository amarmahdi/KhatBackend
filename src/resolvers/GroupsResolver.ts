import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Groups } from "../entity/Groups.";
import { MyContext } from "../MyContext";
import { isAuth } from "../policies/isAuth";


@Resolver()
export class GroupsResolver {
    @Query(()=> [Groups])
    @UseMiddleware(isAuth)
    async allGroups(
        @Ctx() { payload } : MyContext
    ) {
        return await Groups.find()
    }

    @Mutation(()=>Boolean)
    @UseMiddleware(isAuth)
    async createGroup(
        @Arg('name') name: string,
        @Arg('type') type: string,
        @Ctx() {payload} : MyContext,
    ){
        const findGroup = await Groups.findOne({where: { name }})

        if (name == '') throw new Error('Please enter group name! Group name cannot be empty.')
        if (type == '') throw new Error('Please specify group type! Group type cannot be empty.')
        if (findGroup) throw new Error('Group name taken. Try another name')
        const user = {
            id: payload.username
        }
        await Groups.insert({
            name,
            type,
            creator: user
        })

        return true
        
    }
}