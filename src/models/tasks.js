const mongoose = require('mongoose')
const validator = require('validator')
const User=require("./users")
const taskschema= new mongoose.Schema({
    description :{
        type:String,
        required:true,
        trim: true
    },
    completed :{
        type:Boolean
    },
    owner: {     
            type: mongoose.Schema.Types.ObjectId,   
              required: true,     
                  ref: 'User'     } 
},{
    timestamps:true
})
const Task = mongoose.model('Task', {    
     owner: {  
           type: mongoose.Schema.Types.ObjectId,  
                  required: true,   
                        ref: 'User'     } })

const Tasks= mongoose.model('Tasks',taskschema)
   module.exports= Tasks