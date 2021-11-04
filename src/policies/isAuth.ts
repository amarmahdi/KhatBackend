import { MiddlewareFn, ResolverData } from "type-graphql"
import { MyContext } from "../MyContext"
import { verify } from "jsonwebtoken"
import { secret } from "../resolvers/UserResolver"

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next)=>{
    const authorization = context.req.headers['authorization']

    if(!authorization){
        throw new Error('not authorized')
    }

    try {
        const token = authorization.split(' ')[1]
        const payload = verify(token, secret)
        context.payload = payload as any

    } catch (error) {
        console.log('\n\nerror \n')
        throw new Error('not authorized')
    }
    return await next()
}