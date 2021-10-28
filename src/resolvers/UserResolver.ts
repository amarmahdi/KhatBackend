import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LoginRespose, Tokens, User } from "../entity/User";
import { hash, compare } from "bcryptjs"
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
        if (email === '') throw new Error('Please enter your email! Email cannot be empty.')
        if (username === '') throw new Error('Please enter your username! Username cannot be empty.')
        if (password === '') throw new Error('Please enter your password! Password cannot be empty.')

        const hashedPassword = await hash(password, 12)

        await User.insert({ 
            email, 
            username, 
            password: hashedPassword,
        })
        
        return true
    }

    // login user
    @Mutation(()=>LoginRespose)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
    ) {
        const findUser = await User.findOne({where: {username}})
        if (!findUser) throw new Error('User not found')

        const comparedPassword = await compare(password, findUser.password)

        if (!comparedPassword) throw new Error('Password is not correct. Please insert the correct password and try again!')

        const token = JWT(findUser.id)
        await Tokens.insert({ userId: findUser.id, token  })

        return {
            accessToken: token
        }
    }

}