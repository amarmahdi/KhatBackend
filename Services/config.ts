export default {
    port : 3000,
    db: {
        database: 'KhatAppDb',
        user: 'postgres',
        password: 'root',
        options: {
            dialect: 'postgres'
        }
    },
    authentication: {
        JWTSecret: "somesecret"
    }
}