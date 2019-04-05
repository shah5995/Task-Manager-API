const express = require('express')
require('./database/mongoose')
const User = require('./models/users')
const Tasks=require("./models/tasks")

const userRouter=require("./routers/users")
const TaskRouter=require("./routers/tasks")

const app = express()
const port = process.env.PORT
//-----------midlleware---------------
// app.use((req,res,next)=>{

//     res.status(503).send("server under maintainence")
   
// })
//---------------------uploading--------------------
const multer = require('multer') 
 
const upload = multer({ 
        dest: 'avatars',
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
// app.post('/users/me/avatar', upload.single('avatar'), (req, res) => {     res.send() },(error,req,res,next)=>{

//     res.status(400).send({error :error.message})
// }) 
//_____________________________________________________
app.use(express.json())
app.use(userRouter) 

app.use(TaskRouter) 

 




app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
})
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

//  myFunction()



// app.post('/users',async (req, res) => {

//     const user = new User(req.body)
//     try{
//         await user.save()
//         res.send(user)
//     }catch(e) {
//         res.status(400).send(e)
//     }

//     // user.save().then(() => {
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     // })
// })

// app.post('/tasks',async (req, res) => {
//     const task= new Tasks(req.body)
//        // const user = new User(req.body)
//        try{
//         await task.save()
//         res.send(task)
//     }catch(e) {
//         res.status(400).send(e)
//     }
    
//     //     task.save().then(() => {
//     //         res.send(task)
//     //     }).catch((e) => {
//     //         res.status(400).send(e)
//     //     })
//     // 
// })

//     app.get("/users",async (req,res)=>{
// try{
//     const user=await User.find({})
// res.send(user)
// }catch(e){
//     res.status(500).send(e)
// }


//         // User.find({}).then((user)=>{
//         //   res.send(user)
//         // }).catch((e)=>{
//         //     res.status(500).send(e)

//         // })

//     })
    
   
// app.get('/users/:id',async(req,res)=>{
//     const idd=req.params.id
// try{
//     const user= await User.findById(idd)
//     console.log(user)
//     if(!user)
//         {
//            return res.status(404).send() 
//            // return
//         }
//         res.send(user)
// }catch(e){
//     res.status(500).send(e)

// }


//     // User.findById(idd).then((user)=>{
//     //     if(!user)
//     //     {
//     //         res.status(400).send() 
//     //         return
//     //     }
//     //     res.send(user)

//     // }).catch((e)=>{
//     //     res.status(500).send(e)

//     // })

// })
// app.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// app.get("/tasks",async (req,res)=>{

//     try{
//         const task=await Tasks.find({})
//         res.send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }


//     // Tasks.find({}).then((task)=>{
//     //   res.send(task)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)

//     // })

// })


// app.get('/Tasks/:id',async (req,res)=>{
// const idd=req.params.id


// try{
//     const user= await  Tasks.findById(idd)
//     if(!user)
//         {
//             res.status(404).send() 
//             return
//         }
//         res.send(user)
// }catch(e){
//     res.status(500).send(e)

// }


// // Tasks.findById(idd).then((user)=>{
// //     if(!user)
// //     {
// //         res.status(400).send() 
// //         return
// //     }
// //     res.send(user)

// // }).catch((e)=>{
// //     res.status(500).send(e)

// // 
// })

// app.patch('/tasks/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)

//         if (!task) {
//             res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

   

