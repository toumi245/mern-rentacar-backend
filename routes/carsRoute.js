const express=require("express")
const router=express.Router()
const car=require("../models/carModel")

router.get("/getAllCars",async(req,res)=>{
    try {
        const cars= await car.find()
        res.send(cars)
    } catch (error) {
        return res.status(400).json(error)
    }
})
router.post("/addCar",async(req,res)=>{
    try {
        const newCar= new car(req.body)
        await newCar.save()
        res.send("Car added sucessfully")
    } catch (error) {
       return res.status(400).json(error)
    }
})
router.post("/editcar",async(req,res)=>{
    try {
        const kar= await car.findOne({_id:req.body._id})
        kar.name=req.body.name
        kar.image=req.body.image
        kar.fuelType=req.body.fuelType
        kar.rentPerHour=req.body.rentPerHour
        kar.capacity=req.body.capacity

        await kar.save()
        res.send("Car details updated successfully")
    } catch (error) {
       return res.status(400).json(error)
    }
})
router.post("/deletecar",async(req,res)=>{
    try {
         await car.findOneAndDelete({_id:req.body.carid})
      
        res.send("Car deleted successfully")
    } catch (error) {
       return res.status(400).json(error)
    }
})
module.exports=router