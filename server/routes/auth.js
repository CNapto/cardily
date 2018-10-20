const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");


// github
router.get("/github",passport.authenticate("github",{
    scope:["profile"]
}));

router.get("/github/redirect",passport.authenticate("github",{failureRedirect:"/"}),(req,res,next)=>{
    jwt.sign({id:req.user._id},process.env.JSONSECRET,(err, token)=>{
        if(err)
            console.log(err);
        else res.json({token});
    });
});




// google
router.get("/google",passport.authenticate("google",{
    scope:["profile"]
}));

router.get("/google/redirect",passport.authenticate("google",{failureRedirect:"/"}),(req,res,next)=>{
    jwt.sign({id:req.user._id},process.env.JSONSECRET,(err, token)=>{
        if(err)
            console.log(err);
        else res.json({token});
    });
});




// linkedIn
router.get("/linkedin",passport.authenticate("linkedin",{
    scope:["profile"]
}));

router.get("/linkedin/redirect",passport.authenticate("linkedin",{failureRedirect:"/"}),(req,res,next)=>{
    jwt.sign({id:req.user._id},process.env.JSONSECRET,(err, token)=>{
        if(err)
            console.log(err);
        else res.json({token});
    });
});

module.exports = router;