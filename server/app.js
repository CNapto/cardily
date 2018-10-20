require("dotenv").config();
require("morgan")("dev");
const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const gqlHTTP = require("express-graphql");
const {gqlSchema} = require("./gql");
const passport = require("passport");
require("./routes/strategy");

const app = express();

// body parser
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

//use passport js
app.use(passport.initialize());
app.use(passport.session());

// mongoDB
mongoose.connect(process.env.DBURL,{useNewUrlParser:true});
mongoose.connection.once("open",()=>console.log("Connected to DB"))
.on("error",()=>console.log("Error connecting to DB"));

app.use("/graphql",gqlHTTP({
    schema:gqlSchema,
    graphiql:true
}));

app.get("/",(req,res,next)=>{
    res.json({message:"Welcome, go on /graphql to get started"});
});

app.use("/auth",require("./routes/auth"));


app.listen(process.env.PORT || 3000,()=>console.log("Listening...."))