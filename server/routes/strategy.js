const githubStrategy = require("passport-github").Strategy;
const passport = require("passport");
const {
    getUser,
    addUser
} = require("../schema");


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
    getUser({email:profile.username})
    .then((user)=>{
        if(user)
            return done(null,user);
        addUser({
            name:profile.displayName,
            email:profile.email || profile.username,
            image:profile.photos[0],
            github:profile.profileUrl
        }).then((u)=>{return done(null,user);console.log("added user")})
        .catch(console.log);
    })
}))