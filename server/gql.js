const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull
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





const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({
        addUser:{
            type:UserType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                address:{type:GraphQLString},
                image:{type:GraphQLString},
                website:{type:GraphQLString},
                post:{type:GraphQLString},
                fb:{type:GraphQLString},
                linkedin:{type:GraphQLString},
                gplus:{type:GraphQLString},
                twitter:{type:GraphQLString},
                github:{type:GraphQLString}
            },
            resolve(parent,args){
                return addUser(args)
            }
        },
        updateUser:{
            type:UserType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                name:{type:GraphQLString},
                address:{type:GraphQLString},
                image:{type:GraphQLString},
                website:{type:GraphQLString},
                post:{type:GraphQLString},
                fb:{type:GraphQLString},
                linkedin:{type:GraphQLString},
                gplus:{type:GraphQLString},
                twitter:{type:GraphQLString},
                github:{type:GraphQLString}
            },
            resolve(parent,args){
                let query={};
                if(args.name) query.name = args.name;
                if(args.address) query.address = args.address;
                if(args.image) query.image = args.image;
                if(args.website) query.website = args.website;
                if(args.post) query.post = args.post;
                if(args.fb) query.fb = args.fb;
                if(args.linkedin) query.linkedin = args.linkedin;
                if(args.gplus) query.gplus = args.gplus;
                if(args.twitter) query.twitter = args.twitter;
                if(args.github) query.github = args.github;

                return updateUser(args.id,query);
            }
        }
    })
})



module.exports.gqlSchema = new GraphQLSchema({
    query:RootQuery,
    mutation
})