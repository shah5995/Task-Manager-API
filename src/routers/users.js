const express = require('express')
const User = require('../models/users')
const router = new express.Router()
var jwt =require("jsonwebtoken")
var auth =require("../middleware/auth")
const{ SendWelcomeEMail,SendcancelEMail } = require("../emails/account")

router.post('/users',async (req, res) => {

    const user = new User(req.body)
    try{
        
      
        await user.save()
        SendWelcomeEMail(user.email,user.name)
        const token= await user.generateauthToken()
        res.status(200).send({user,token})
       // res.send(user)
    }catch(e) {
        res.status(400).send("something went wrong")
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.post('/users/login', async (req,res)=>{
    
    try
    {
        const user= await User.findUserBycredential(req.body.email,req.body.password)

       const token= await user.generateauthToken()
    res.send({user,token})
  //  res.send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})


    router.get("/users/me", auth , async (req,res)=>{
res.send(req.user)
 
        // User.find({}).then((user)=>{
        //   res.send(user)
        // }).catch((e)=>{
        //     res.status(500).send(e)

        // })

    })
    router.post("/users/logout", auth , async (req,res)=>{
    try{
req.user.tokens= req.user.tokens.filter((token) =>{
    return token.token !== req.token
})
await req.user.save()
res.send()

    }catch(e){
        res.status(400).send("error")
    }
        
            })
            
    
            router.post("/users/logoutall", auth , async (req,res)=>{
                try{
            req.user.tokens = []
            await req.user.save()
            res.send()
            
                }catch(e){
                    res.status(400).send("error")
                }
                    
                        })
                        
                
                 
router.get('/users/:id',async(req,res)=>{
    const idd=req.params.id
try{
    const user= await User.findById(idd)
    console.log(user)
    if(!user)
        {
           return res.status(404).send() 
           // return
        }
        res.send(user)
}catch(e){
    res.status(500).send(e)

}


    // User.findById(idd).then((user)=>{
    //     if(!user)
    //     {
    //         res.status(400).send() 
    //         return
    //     }
    //     res.send(user)

    // }).catch((e)=>{
    //     res.status(500).send(e)

    // })

})
router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
    //   const user= await User.findById(req.params.id)
       updates.forEach((update) => req.user[update] = req.body[update])
await req.user.save()
      // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
       

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth,async (req, res) => {
    try {
       

      await req.user.remove()
      SendcancelEMail(req.user.email,req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const multer = require('multer') 
 
const upload = multer({ 
      //  dest: 'avatars',
limits : {
    fileSize:1000000
} ,
fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg||jpeg||png)$/)){
        return cb(new Error('Please upload an image file')) 
    }
    cb(undefined,true)
}


})
router.post('/users/me/avatar',auth, upload.single('avatar'), async(req, res) => {     
    req.user.avatar = req.file.buffer   
      await req.user.save()   
        res.send() },
         (error, req, res, next) => {     res.status(400).send({ error: error.message })

}) 
router.delete('/users/me/avatar',auth, async(req, res) => {     
    req.user.avatar = undefined   
      await req.user.save()   
        res.send() },
         (error, req, res, next) => {     res.status(400).send({ error: error.message })

}) 

router.get('/users/:id/avatar', async (req, res) => { 
        try {  
                   const user = await User.findById(req.params.id) 
    if (!user || !user.avatar)
     {
      
        throw new Error()  
      
    } 

    res.set('Content-Type', 'image/jpg')     
        res.send(user.avatar) 
        } 
        catch (e) { 
                    res.status(404).send()  
                   }
                 })

module.exports = router