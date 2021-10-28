import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"


(
    async ()=>{
        const PORT = 3000
        const app = express()
        await createConnection()
        .then(e=>console.log('\n\n----------db connected--------\n'))
        .catch(e=>console.log('\n\n???????error connecting to db?????????? \n', e, '\n'))
        const server = new ApolloServer({
            introspection: true,
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
            schema: await buildSchema({
                resolvers: [UserResolver]
            }),
            context: ({req, res}) => ({req, res})
        })
        await server.start()
        server.applyMiddleware({app, cors: false})
        app.listen(PORT, ()=>{
            console.log("\n\nServer listening on port:",PORT, '\nGraphql server:', server.graphqlPath, '\n')
        })
    }
)()