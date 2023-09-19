const express=require('express')

const app=express()
const port=process.env.port ||6001
const dbConnection=require('./config/db')
app.use(express.json())

app.use("/api/cars/",require("./routes/carsRoute"))
app.use("/api/users/",require("./routes/usersRoute"))
app.use("/api/bookings/" ,require("./routes/bookingsRoute"))

app.get('/',(req,res)=>res.send('hello world'))
app.listen(port,()=>console.log(`node js server started in port ${port} `))