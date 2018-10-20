const githubStrategy = require("passport-github").Strategy;
const passport = require("passport");

passport.serializeUser((user,done)=>{
    done(null,user.email);
});

passport.deserializeUser((userEmail,done)=>{
    done(null,userEmail);
});

passport.use(new githubStrategy({
    clientID:process.env.GITHUBID,
    clientSecret:process.env.GITHUBSECRET,
    callbackURL:process.env.GITHUB_CALLBACK
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile)
    return done(null,user);
}))