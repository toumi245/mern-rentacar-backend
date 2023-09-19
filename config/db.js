const mongoose=require('mongoose')
function connectDB(){

      mongoose.connect ('mongodb+srv://chedlit5:1234@cluster0.bny19cm.mongodb.net/',{
      useUnifiedTopology:true,
      useNewUrlParser:true})
const connection=mongoose.connection
connection.on('connected',()=>{
    console.log('mongo db connectiion succesful')
})
connection.on("error",()=>{
    console.log('mongo db connection error')
})
    } 
    connectDB()

module.exports=mongoose