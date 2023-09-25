const express = require("express")
const { employeeModel } = require("../model/employeModel")

const employeRouter = express.Router()

// add Employee
employeRouter.post("/addemployee",async(req,res)=>{
    try {
        const data = new employeeModel(req.body)
        await data.save()
        res.status(200).send({"msg":"new employee added"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

// get employee
employeRouter.get("/",async(req,res)=>{
    try {
        const data = await employeeModel.find()
        res.status(200).send({"data":data})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

// patch Employee
employeRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await employeeModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"employee updated "})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

// Delete employee
employeRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await employeeModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"employee delete "})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

module.exports = {employeRouter}

