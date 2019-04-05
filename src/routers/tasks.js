const express = require('express')

const Tasks = require('../models/tasks')

const router = new express.Router()
const User=require("../models/users")
const auth=require("../middleware/auth")
router.post('/tasks',auth,async (req, res) => {
    const task= new Tasks({
        ...req.body,
        owner : req.user._id
    })
       // const user = new User(req.body)
       try{
        await task.save()
        res.send(task)
    }catch(e) {
        res.status(400).send(e)
    }
    
    //     task.save().then(() => {
    //         res.send(task)
    //     }).catch((e) => { 
    //         res.status(400).send(e)
    //     })
    // 
})
router.get("/tasks",auth,async (req,res)=>{
    const match = {}
    const sort={}
    if (req.query.sortBy) {   
          const parts = req.query.sortBy.split(':')  
       sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 } 

    if (req.query.completed) { 
            match.completed = req.query.completed === 'true'
         } 
    try{
        await req.user.populate({    
         path: 'tasks', 
          match,     
         
         options: {      
                limit: parseInt(req.query.limit), 
                        skip: parseInt(req.query.skip) ,
                        sort
                        } }).execPopulate()
                        res.send(req.user.tasks)

                     } catch(e){
        res.status(500).send(e)
    }


    // Tasks.find({}).then((task)=>{
    //   res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)

    // })

})
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id
    
    
    try{
        const task= await  Tasks.findOne({ _id, owner: req.user._id})
        if(!task)
            {
                res.status(404).send() 
                return
            }
            res.send(task)
    }catch(e){
        res.status(500).send(e)
    
    }
    
    
    // Tasks.findById(idd).then((user)=>{
    //     if(!user)
    //     {
    //         res.status(400).send() 
    //         return
    //     }
    //     res.send(user)
    
    // }).catch((e)=>{
    //     res.status(500).send(e)
    
    // 
    })
    
    router.patch('/tasks/:id',auth, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            const task = await Tasks.findOne({_id:req.params.id,owner:req.user._id})
    
           
    
            if (!task) {
                return res.status(404).send()
            }
            updates.forEach((update) => task[update] = req.body[update])
            await task.save()
    
            res.send(task)
        } catch (e) {
            res.status(405).send(e)
        }
    })
  
    
    router.delete('/tasks/:id',auth, async (req, res) => {
        try {
            const task = await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    
            if (!task) {
                res.status(404).send()
            }
            console.log(task)
    
            res.send(task)
        } catch (e) {
            res.status(500).send()
        }
    })
    module.exports = router
    