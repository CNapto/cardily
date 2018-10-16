const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = require("graphql")

const {
    getUser,
    updateUser,
    delUser,
    addUser
} = require("./schema");




const UserType = new GraphQLObjectType({
    name:"user",
    fields:()=>({
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        address:{type:GraphQLString},
        image:{type:GraphQLString},
        website:{type:GraphQLString},
        post:{type:GraphQLString},
        fb:{type:GraphQLString},
        linkedin:{type:GraphQLString},
        gplus:{type:GraphQLString},
        twitter:{type:GraphQLString},
        github:{type:GraphQLString}
    })
});



const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:()=>({
        userById:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return getUser({_id:args.id})
            }
        },
        userByEmail:{
            type:UserType,
            args:{email:{type:GraphQLString}},
            resolve(parent,args){
                return getUser({email:args.email});
            }
        },
        users:{
            type:UserType,
            resolve(parent,args){
                return getUser({});
            }
        }
    })
});


module.exports.gqlSchema = new GraphQLSchema({
    query:RootQuery
})