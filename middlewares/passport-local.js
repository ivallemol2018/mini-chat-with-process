const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const { getUserByCriteria, createUser,getUserById } = require('../services/userServices')

passport.use('login', new LocalStrategy(
  async (username,password,done)=>{
    try{  
      const user = await getUserByCriteria({username})

      if(bcrypt.compareSync(password,user.password)) return done(null,user)

      return done(null,false, { message: 'user or password are incorrect'})

    } catch(error){
      return done(null,false, { message: 'user or password are incorrect'})
    }    
  }
))

passport.use('signup', new LocalStrategy(
  async (username,password,done)=>{
    try{  

      const newUser = {username, password: bcrypt.hashSync(password,bcrypt.genSaltSync(10))}

      const user = await createUser(newUser)

      if(user) return done(null,user)

    } catch(error){
      return done(null,false,{ message: 'user already exists'})
    }    
  }
))

passport.serializeUser((user,done)=>{
  done(null,user._id)
})

passport.deserializeUser(async (id,done)=>{
  try{
    const user = await getUserById(id,done)
    if(user) return done(null,user)  
    done('No exists user',null)
  }catch(error){
    return done(error,false)
  }
  
})

module.exports = passport