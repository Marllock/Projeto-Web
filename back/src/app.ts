const dotenv = require('dotenv')

// get config vars
dotenv.config()

console.log(process.env.TOKEN_SECRET)
