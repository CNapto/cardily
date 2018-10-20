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
    address:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    website:{
        type:String,
        default:null
    },
    post:{
        type:String,
        default:null
    },
    fb:{
        type:String,
        default:null
    },
    linkedin:{
        type:String,
        default:null
    },
    gplus:{
        type:String,
        default:null
    },
    twitter:{
        type:String,
        default:null
    },
    github:{
        type:String,
        default:null
    },
    cards:{
        type:[String],
        default:[]
    }
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



module.exports.updateUser = (search,perform)=>{
    return new Promise((resolve,reject)=>{
        users.findOneAndUpdate(search,perform)
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


module.exports.getAll = ()=>{
    return new Promise((resolve,reject)=>{
        users.find({})
        .then((d)=>{
            if(d.length < 1)
                reject("No user found");
            resolve(d);
        })
        .catch(reject);
    });
};



module.exports.fullUserModel = users;