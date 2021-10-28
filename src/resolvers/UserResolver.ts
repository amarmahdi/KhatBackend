import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LoginRespose, Tokens, User } from "../entity/User";
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { MyContext } from "../MyContext";


const JWT = (username: string, secret: string)=>{
    const EXP_DATE = 60 * 60 * 24 * 7
    return sign({username}, secret, {expiresIn: EXP_DATE})
}

const secret = 'somesecret'
@Resolver()
export class UserResolver {
    // find all users
    @Query(()=>[User])
    allUsers(){
        return User.find()
    }

    //create user
    @Mutation(()=>LoginRespose)
    async createUsers(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('password') password: string,
    ){

        const findUsername = await User.findOne({where: {username}})
        const findEmail = await User.findOne({where: {email}})
        const verifyEmail = email.split('')
        if (email == '') throw new Error('Please enter your email! Email cannot be empty.')
        if (verifyEmail.indexOf('@') == -1) throw Error('Please enter a valid email!')
        if (verifyEmail.indexOf('.') == -1) throw Error('Please enter a valid email!')
        if (username == '') throw new Error('Please enter your username! Username cannot be empty.')
        if (password == '') throw new Error('Please enter your password! Password cannot be empty.')
        if (findUsername) throw new Error('Username is already in use')
        if (findEmail) throw new Error('Email is already in use')
        
        const hashedPassword = await hash(password, 12)

        await User.insert({ 
            email, 
            username, 
            password: hashedPassword,
        })
        
        const token = JWT(findUsername.id, secret)
        await Tokens.insert({ userId: findUsername.id, token  })

        return {
            accessToken: token
        }
    }

    // login user
    @Mutation(()=>LoginRespose)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() {res} : MyContext,
    ) {
        const findUser = await User.findOne({where: {username}})
        if (!findUser) throw new Error('User not found')

        const comparedPassword = await compare(password, findUser.password)

        if (!comparedPassword) throw new Error('Password is not correct. Please insert the correct password and try again!')

        const token = JWT(findUser.id, secret)
        await Tokens.insert({ userId: findUser.id, token  })

        const cookieToken = JWT(findUser.id, 'cookiesecret')


        res.cookie('KhatCookie', cookieToken, {httpOnly: true})

        return {
            accessToken: token
        }
    }

}