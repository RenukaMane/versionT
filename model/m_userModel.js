const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const m_userSchema = new mongoose.Schema({

 user_name: {
   type: String,
   required: [true,"Name is required"],
   
 },

 last_name:{
   type:String,
   
 },

 email_id:{
   type: String,
   required: [true,'Email is required'],
   unique: true,
   lowercase: true,
   validate: [validator.isEmail, 'Please provide a valid email']

 },
 
 img : {
   type: String,
   default: "default.png"
 },
 
 password:{
   type: String,
   minlength: 6,
   
 },



 Range:{
   type: Number,
   default: 5
 }

})


m_userSchema.pre('save',async function(next){

  
  //if(!this.isModified(this.password)) return next();
  
  
  this.password = await bcrypt.hash(this.password,12);
   
  this.passwordConfirm = undefined;
  

});

//Instance method will be aplicable on all the documents 
//Now thos.password will not be accessible as we have set it to false
m_userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
     
  
  return await bcrypt.compare(candidatePassword,userPassword);
       
  


}



const m_User = mongoose.model('m_user',m_userSchema);

module.exports = m_User;

