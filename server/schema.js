const mongoose = require("mongoose");

users = mongoose.model("user",new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:String,
    image:String,
    website:String,
    post:String,
    fb:String,
    linkedin:String,
    gplus:String,
    twitter:String,
    github:String
}));



module.exports.addUser = (data)=>{
    return new Promise((resolve,reject)=>{
        users.findOne({email:data.email})
        .then((u)=>{
            if(!u){
                users.create(data)
                .then(resolve)
                .catch(reject)
            } else{
                reject("User already exists");
            }
        }).catch(reject);
    })
};



module.exports.delUser = (id)=>{
    return new Promise((resolve,reject)=>{
        users.findOneAndRemove({_id:id})
        .then(resolve)
        .catch(reject);
    });
};



module.exports.updateUser = (id,query)=>{
    return new Promise((resolve,reject)=>{
        users.findOneAndUpdate({_id:id},query)
        .then(resolve)
        .catch(reject);
    });
};


module.exports.getUser = (query)=>{
    return new Promise((resolve,reject)=>{
        users.find(query)
        .then((d)=>{
            if(d.length < 1)
                reject("No user found");
            resolve(d[0]);
        })
        .catch(reject);
    });
};