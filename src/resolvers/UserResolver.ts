import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, Token } from "../entity/User";
import { sign } from "jsonwebtoken"

const JWT = (username: string)=>{
    const EXP_DATE = 60 * 60 * 24 * 7
    return sign({username}, 'somesecret', {expiresIn: EXP_DATE})
}

@Resolver()
export class UserResolver {
    // find all users
    @Query(()=>[User])
    allUsers(){
        return User.find()
    }

    //create user
    @Mutation(()=>Boolean)
    async createUsers(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('password') password: string,
    ){

        const findUsername = await User.findOne({where: {username}})
        const findEmail = await User.findOne({where: {email}})
        if (findUsername) throw new Error('Username is already in use')
        if (findEmail) throw new Error('Email is already in use')
    
        await User.insert({ 
            email, 
            username, 
            password
        })
        
        return true
    }

    // login user
    @Mutation(()=>User)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
    ) {
        const findUser = await User.findOne({where: {username}})
        if (!findUser) throw new Error('User not found')
        if (findUser.password !== password) throw new Error('Password is not correct')
        return findUser
    }

}