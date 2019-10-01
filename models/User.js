const bcrypt = require("bcryptjs")
const usersCollection = require('../db').db().collection("users")
const validator = require("validator")


let User = function(data){
    this.data = data
    this.errors = []


}
User.prototype.cleanup = function(){
    if(typeof(this.data.username) !="string"){this.data.username = ""}
    if(typeof(this.data.email) !="string"){this.data.email = ""}
    if(typeof(this.data.password) !="string"){this.data.password = ""}
    //get rid od any bogus properties
    this.data = {
        username:this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password:this.data.password
    }
}
User.prototype.validate =function(){
    return new Promise(async (resolve,reject)=>{
        if(this.data.username ==""){this.errors.push("you must provide a username")}
        if(this.data.username !=="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("username can only be letters and numbers.")}
        if(!validator.isEmail(this.data.email)){this.errors.push("you must provide a email")}
        if(this.data.password ==""){this.errors.push("you must provide a password")}
        if(this.data.password.length > 0 && this.data.password.length < 6){this.errors.push("Password must be 6 character")}
        if(this.data.password.length > 50){this.errors.push("password cannot exceed 50 character.")}
        if(this.data.username.length > 0 && this.data.username.length < 3){this.errors.push("username must be 6 character")}
        if(this.data.username.length > 30){this.errors.push("password cannot exceed 30 character.")}
        
        // only if username is valid check to see if itds works
        if(this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)){
            let usernameExists = await usersCollection.findOne({username: this.data.username})
            if(usernameExists){this.errors.push("that username is already taken")}
        
        }
        // if email exist
        if(validator.isEmail(this.data.email)){
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if(emailExists){this.errors.push("that email is already taken")}
        
        }
        resolve
        }
        )
}
User.prototype.login = function(){
   return new Promise((resolve, reject)=> {
    this.cleanup()
    usersCollection.findOne({username: this.data.username}).then((attemptedUser) =>{
        if(attemptedUser && bcrypt.compareSync(this.data.password,attemptedUser.password)){
            resolve("congrats")
  
          }else{
           reject("invalid username/ password")
  
          }
    }).catch(function(){
        reject("please try later.")
    })
       
    })


   
}
User.prototype.register = function(){
    return new Promise(async (resolve,reject) =>{
        //step 1: validate user data
        this.cleanup()
        await this.validate()
        
        //step 2: only if there is no validation
        //error saved in the database.
        if(!this.errors.length){
            //hash users password
     
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()
        }else{
            reject(this.errors)

        }
        })
        
}




module.exports = User