const axios = require('axios');
const jwt = require('express-jwt');//extracts token from headers
const jwks =require('jwks-rsa'); //Sets a secret

const verifyJwt = (req,res,next)=>{
    jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwkRequestsPerMinute: 5,
            jwksUri: 'https://gauraang.us.auth0.com/.well-known/jwks.json'
        }),
        audience: "my first auth0",
        issuer: 'https://gauraang.us.auth0.com/',
        algorithms: ['RS256']   
        })
};

module.exports = verifyJwt;

