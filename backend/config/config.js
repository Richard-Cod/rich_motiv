console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_HOST)
module.exports = {
    port : process.env.PORT || 4000,
    db : {
        database : process.env.DB_NAME || 'rich_motiv_bdd',
        user : process.env.DB_USER || 'docker',
        password : process.env.DB_PASSWORD || 'docker',
        options : {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.DB_HOST || '127.0.0.1',
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'qsrè_g-sèg(-_df-qçrgf-èq'
    }
}