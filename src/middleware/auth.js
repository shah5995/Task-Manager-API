const jwt= require("jsonwebtoken")
const Users=require("../models/users")

const auth =async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace("Bearer ","")
       const decoded = jwt.verify(token,process.env.TOKEN)
       //console.log(decoded)
       const user= await Users.findOne({ _id:decoded._id, 'tokens.token': token })
      // console.log(user)
      
if(!user)
{
    throw new Error()
}

req.token=token
req.user=user
next()

    }
catch(e){
    res.status(401).send("invalid authorization")
}


}


module.exports = auth