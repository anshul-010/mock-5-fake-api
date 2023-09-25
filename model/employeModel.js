const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:Number 
})

const employeeModel = mongoose.model("employee",employeeSchema)

module.exports = {employeeModel}