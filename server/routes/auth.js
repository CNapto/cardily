const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/",(req,res)=>{
    res.send("hi")
})
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

module.exports = router;