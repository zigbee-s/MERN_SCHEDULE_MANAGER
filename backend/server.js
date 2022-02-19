require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

//Connect To the Database
require("./db/conn");

//Middleware
//Tells the server to deal with incoming data in body of a post requests as json
app.use(express.json());

//Set routes
app.use(require('./router/routes'));




app.listen(PORT, ()=>{console.log(`Server started at port: ${PORT}`)});