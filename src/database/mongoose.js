const mongoose= require("mongoose");
//const validator = require("validator");
mongoose.connect(process.env.MOngodb_URL,{
    useNewUrlParser: true,
    useCreateIndex:true
})
// const User= mongoose.model('User',{
//     name :{
//         type:String,
//         required:true
//     },
//     email :{
//         type : String,
//         required:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("email.iss invakid")
//             }
//         }

//     },
//     age :{
//         type:Number,
//         default: 0,
//         validate(value)
//         {
//             if(value<0)
//             {
//                 throw new Error("age is not true") 
//             }
//         }
        
//     },
// password:{
//     type:String,
    
//     required:true,
//     minlength:7,
//     validate(value)
//     {
//         if(value.toLoweCase.include('password'))
//         {
//             throw new Error("re enter password") 
//         }
//     }

    

// }
// })
// const me =new User({
//     name:"shah faisal",

//   //  email:"shahshah@g.com"
// })
// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
//     console.log("ERROR!",error)
// })

// const Tasks= mongoose.model('Tasks',{
//     description :{
//         type:String
//     },
//     completed :{
//         type:Boolean
//     }})
//     const task1=new Tasks({
//         description:"start data connection",
//         completed:true

//     })
//     task1.save().then(()=>{
//         console.log(task1)
//     }).catch((error)=>{
//         console.log(error)
//     })
