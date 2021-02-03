import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";
const router = express.Router();

router.post('/register', async (req,res)=>{
    const user = new User({
      name: req.body.name,
      password: req.body.password,
    })
    const newUser = await user.save()
    if(newUser){
      res.send({
        _id: newUser.id,
        name: newUser.name,
        token: getToken(newUser)
      })
    }else{
      res.status(401).send({message: "Invalid user data"})
    }
  })

router.post("/signin", async(req,res)=>{
    const signinUser = await User.findOne({
        name: req.body.name,
        password:req.body.password
    })
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name:signinUser.name,
            isAdmin:signinUser.isAdmin,
            token: getToken(signinUser)
        })
    }else{
        res.status(401).send({message:"Invalid username or password"})
    }
})

router.get("/", async (req,res)=>{
    const allUsers = await User.find({})
    res.send(allUsers)
})

export default router;
