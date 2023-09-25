const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { employeRouter } = require("./routes/employeRoutes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/employees",employeRouter)

app.get("/",(req,res)=>{
    res.send("This is for testing")
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log(`connected to DB`)
        console.log(`server is running on port 8080`)
    } catch (error) {
        console.log(error)
    }
})

// going for washroom