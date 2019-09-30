const usersCollection = require('../db').collection("users")
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
User.prototype.validate = function(){
if(this.data.username ==""){this.errors.push("you must provide a username")}
if(this.data.username !=="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("username can only be letters and numbers.")}
if(!validator.isEmail(this.data.email)){this.errors.push("you must provide a email")}
if(this.data.password ==""){this.errors.push("you must provide a password")}
if(this.data.password.length > 0 && this.data.password.length < 6){this.errors.push("Password must be 6 character")}
if(this.data.password.length > 100){this.errors.push("password cannot exceed 100 character.")}
if(this.data.username.length > 0 && this.data.username.length < 3){this.errors.push("username must be 6 character")}
if(this.data.username.length > 30){this.errors.push("password cannot exceed 30 character.")}

}
User.prototype.register = function(){
   //step 1: validate user data
   this.cleanup()
   this.validate()
   
   //step 2: only if there is no validation
   //error saved in the database.
   if(!this.errors.length){
       usersCollection.insertOne(this.data)
   }
}



module.exports = User