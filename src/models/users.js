const mongoose = require('mongoose')
const validator = require('validator')
const Tasks=require("./tasks")
const bcrypt=require("bcryptjs")
const jwt= require("jsonwebtoken")
const Userschema= new mongoose.Schema(
    {
        avatar: {      
               type: Buffer     },

        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
           
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            } 
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a postive number')
                }
            }
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
            
        }]
    },{
        timestamps:true
    }
    
)
Userschema.virtual('tasks',
 {     ref: 'Task', 
     localField: '_id', 
         foreignField: 'owner' })

Userschema.methods.toJSON = function () {
         const user = this  
       const userObject = user.toObject() 
 
    delete userObject.password    
     delete userObject.tokens 
 
    return userObject }

Userschema.methods.generateauthToken= async function(){

var user =this
var token=jwt.sign({_id:user._id.toString()},process.env.TOKEN)
user.tokens = user.tokens.concat({ token })
    await user.save()

return token
}
Userschema.statics.findUserBycredential= async (email,password)=>
{
    const user= await User.findOne({email})
    if(!user)
    {
        throw new Error("invalid credential")
    }
    const ismatch= await bcrypt.compare(password,user.password)

    if(!ismatch)
    {
      throw new Error("invalid password")
    }
    return user
}

Userschema.pre('save',async function(next){
    const user= this
    if(user.isModified("password"))
    {
        user.password= await bcrypt.hash(user.password,8)
    }

    next()
})

Userschema.pre('remove',async function(next){
    const user= this
    await Tasks.deleteMany({owner:user._id})
    

    next()
})
const User = mongoose.model('User', Userschema)

module.exports = User