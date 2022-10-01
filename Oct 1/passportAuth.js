const passport = require('passport')
const passportJwt= require('passport-jwt')
const ExtractJWT = passportJwt.ExtractJwt
const Strategy = require('passport-local').Strategy
const PasswordJwtStrategy= passportJwt.Strategy
const UserSchema = require('./UserSchema')
const secretKey="NewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecret"

const localStrategy= new Strategy(
    {
        usernameField:'email',
        passwordField:'password'
    },
   async function (email,password,done){
        const user = 
            await UserSchema.findOne({email,password})
        if(!user){
            return done(null,null,{message:"Authentication Failed!"})
        }
        return done(null,{email:user.email},{message:"Logged in Successfully"})
    }
)

passport.use(localStrategy)

const jwtStrategy = new PasswordJwtStrategy(
    {
        jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey:secretKey
    },
   async function(jwtJson,done){
    console.log("im in")
        const user = 
            await UserSchema.findOne({email:jwtJson.email})
        if(!user){
            return done(null,null)
        }
        return done(null,{email:user.email})
    }
)
passport.use(jwtStrategy)
module.exports=passport