const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../models/User")
const auth=require("../middleware/auth")
// const console = require("node:console")

// post / api / register
router.post("/register",async(req,res)=>{
    try{
        const {name,lastName,email,password,avatar}=req.body

        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                msg:"User already exists"
            })
        }

        // run password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
    //create new user
        user=new User({
            name,
            lastName,
            email,
            password:hashedPassword,
            avatar
    })

    await user.save()

    res.status(201).json({
        msg:"user registered successfully"
    })
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }
})
router.post("/login", async (req,res)=>{
    try{
        const {email,password}=req.body;

        console.log("LOGIN DATA:", email, password);

        const user=await User.findOne({email});

        console.log("USER FOUND:", user);

        if(!user){
            return res.status(400).json({
                msg:"USER NOT FOUND"
            });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        console.log("PASSWORD MATCH:", isMatch);

        if(!isMatch){
            return res.status(400).json({
                msg:"WRONG PASSWORD"
            });
        }

        const payload={
            user:{
                id:user.id,
                email:user.email,
                role:user.role
            }
        };

        const token=jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:"20d"}
        );

        res.json({
            token,
            user:{
                id:user.id,
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                avatar:user.avatar,
                role:user.role
            }
        });

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

router.put("/me",auth, async (req, res) => {
  try {
    const { name,lastName, email, password ,avatar} = req.body;

    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name) user.name = name;
    if(lastName) user.lastName=lastName;
    if (email) user.email = email;
    if(avatar !== undefined){
      user.avatar=avatar;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      msg: "User updated successfully",
      user
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.delete("/me",auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();

    res.json({
      msg: "User deleted successfully"
    });

  } catch (err) {
    console.error(err.message)
    res.status(500).send("server error")
  }
});

router.get("/me",auth,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select("-password")
    if(!user){
      return res.status(404).json({
        msg:"User not found"
      })
    }
    res.json(user)
  }catch(err){
    console.error(err.message)
    res.status(500).send("server error")
  }
})


module.exports=router

