const githubStrategy = require("passport-github").Strategy;
const googleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const {fullUserModel} = require("../schema");


passport.serializeUser((user,done)=>{
    done(null,user.email);
});

passport.deserializeUser((userEmail,done)=>{
    getUser({email:userMail})
    .then((u)=>{
        done(null,u);
    }).catch(console.log)
});

passport.use(new githubStrategy({
    clientID:process.env.GITHUBID,
    clientSecret:process.env.GITHUBSECRET,
    callbackURL:process.env.GITHUB_CALLBACK
},(accessToken,refreshToken,profile,done)=>{
   // console.log(profile)
    fullUserModel.findOne({email:profile.username})
    .then((user)=>{
        if(user)
            return done(null,user);
        let obj = new fullUserModel({
            name:profile.displayName,
            email:profile.email || profile.username,
            image:profile.photos[0].value,
            github:profile.profileUrl
        });
        obj.save()
        .then((u)=>{return done(null,user);console.log("added user")})
        .catch(console.log);
    })
}))







passport.use(new googleStrategy({
    clientID:process.env.GOOGLEID,
    clientSecret:process.env.GOOGLESECRET,
    callbackURL:process.env.GOOGLE_CALLBACK
},(accessToken,refreshToken,profile,done)=>{
   // console.log(profile)
    fullUserModel.findOne({email:profile.username})
    .then((user)=>{
        if(user)
            return done(null,user);
        let obj = new fullUserModel({
            name:profile.displayName,
            email:profile.email || profile.username,
            image:profile.photos[0].value,
            github:profile.profileUrl
        });
        obj.save()
        .then((u)=>{return done(null,user);console.log("added user")})
        .catch(console.log);
    })
}))