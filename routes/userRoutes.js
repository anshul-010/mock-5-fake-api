const express = require("express")
const { userModel } = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router()

// signUp
userRouter.post("/signup",async(req,res)=>{
    const {email,password,confirmPassword} = req.body
    if(password!=confirmPassword){
        return res.send({"msg":"password is not match with confirmPassword"})
    }
    try {
        const checkuser = await userModel.findOne({email})
        if(checkuser){
            res.send({"msg":"already register please login"})
        }
        else{
            bcrypt.hash(password, 7, async(err, hash)=> {
                if(err){
                    res.send({"msg":err})
                }
                else{
                    const newUser = new userModel({email,password:hash,confirmPassword:hash})
                    await newUser.save()
                    res.status(200).send({"msg":"new user register"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})


// login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body

    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({},"secretKey")
                    res.status(200).send({"msg":"login successful",token})
                }
            })
        }
        else{
            res.send({"msg":"wrong credential"})
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

module.exports = {userRouter}