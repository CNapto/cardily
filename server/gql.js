const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList
} = require("graphql")

const {
    getUser,
    updateUser,
    delUser,
    addUser,
    getAll
} = require("./schema");

const jwt = require("jsonwebtoken");


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
        github:{type:GraphQLString},
        id:{type:GraphQLString},
        cards:{
            type:new GraphQLList(UserType),
            async resolve(parent,args){
                let promises = [];
                let data = await getUser({_id:parent.id})
                let cards = data.cards;
                cards.forEach((ID)=>{
                    promises.push(getUser({_id:ID}));
                });
                return Promise.all(promises)
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:()=>({
        findUser:{
            type:UserType,
            args:{token:{type:GraphQLString}},
            resolve(parent,args){
                jwt.verify(args.token,process.env.JSONSECRET,(data)=>{
                    if(err)
                        return "Forbidden"
                    else
                        getUser({_id:data.id})
                })
            }
        },
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
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return getAll();
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
                github:{type:GraphQLString},
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
                github:{type:GraphQLString},
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

                return updateUser({_id:args.id},query);
            }
        },
        deleteUser:{
            type:UserType,
            args:{id:{type:new GraphQLNonNull(GraphQLString)}},
            resolve(parent,args){
                return delUser(args.id);
            }
        },
        addCard:{
            type:UserType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                newcard:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,args){

                let cards = await getUser({_id:args.id}),f=true;
                cards = cards.cards;

                for(let card of cards){
                    if(card == args.newcard){
                        f = !f; break;
                    }
                }
                if(f){
                    return updateUser({_id:args.id,},{
                        $push:{cards:args.newcard}
                    });
                } else return null;
            }
        },
        delCard:{
            type:UserType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                delcard:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,args){

                let cards = await getUser({_id:args.id}),f=true;
                cards = cards.cards;

                for(let card of cards){
                    if(card == args.delcard){
                        f = !f; break;
                    }
                }
                if(!f){
                    return updateUser({_id:args.id,},{
                        $pull:{cards:args.delcard}
                    });
                } else return null;
            }
        }
    })
})



module.exports.gqlSchema = new GraphQLSchema({
    query:RootQuery,
    mutation
})