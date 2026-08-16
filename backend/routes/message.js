const express =require("express")
const router=express.Router()
const auth=require("../middleware/auth")
const Message=require("../models/message")



router.post("/",auth,async(req,res)=>{
    try{
        const{text}=req.body
        const message=new Message({
            text,
            sender:req.user.id
        })
        await message.save()
        req.app.get("io").emit("receiveMessage",message)
        res.status(201).json(message)
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }
})

router.get("/",auth,async(req,res)=>{
    try{
        const messages=await Message.find().populate("sender","name email").sort({createdAt:1})
        res.json(messages)
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }
})

router.put("/:id",auth,async(req,res)=>{
    try{
        const {text}=req.body
        let message=await Message.findById(req.params.id)
        if(!message) 
            return res.status(404).json({
                msg:"message not found"
            })
            if(message.sender.toString()!==req.user.id)
                return res.status(401).json({
                    msg:"not authorized"
                })
                if(text) message.text=text
                await message.save()
                res.json(message)
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }

})

router.delete("/:id",auth,async(req,res)=>{
    try{
        let message=await Message.findById(req.params.id)
        if(!message) 
            return res.status(404).json({
                msg:"message not found"
            })
            if(message.sender.toString()!==req.user.id)
                return res.status(401).json({
                    msg:"not authorized"
                })
                await message.deleteOne()
                res.json({
                    msg:"message removed successfully"
                })
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }

})

module.exports=router