const router = require("express").Router();
const passport = require("passport")

router.get("/",(req,res)=>{
    res.send("hi")
})
router.get("/github",passport.authenticate("github",{
    scope:["profile"]
}));

router.get("/github/redirect",passport.authenticate("github",{failureRedirect:"/"}),(req,res,next)=>{
    res.send("Logged in")
});

module.exports = router;