const express=require("express")
const router=express.Router()
const Booking=require('../models/bookingModel')
const Car=require('../models/carModel')
const { v4: uuidv4 } = require('uuid');
const stripe =require("stripe")('sk_test_51NQZodLucVp5DJybux7Fd29MyapUo1N812E0hViYmEZNNRmbLndDDYsUW2XijfKHcFjnFidh3TRgVzSwiNFsmmWT00L50HfhZO')

router.post("/bookcar",async(req,res)=>{
    const {token}=req.body
    try {

        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const payment=await stripe.charges.create({
            amount:req.body.totalAmount * 100,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email

        },{
            idempotencyKey: uuidv4()
        })
        if(payment){
            req.body.transactionId=payment.source.id
            const newbooking=new Booking(req.body)
            await newbooking.save()
            const car=await Car.findOne({_id:req.body.car})
            car.bookedTimeSlots.push(req.body.bookedTimeSlots)
            await car.save()
            res.send('your booking is successful')
        }
        else{
            return res.status(400).json(error)
        }
       
    } catch (error) {
        return res.status(400).json(error)
    }
    
})
router.get("/getAllBookings",async(req,res)=>{
    try {
        const bookings=await Booking.find().populate('car')
        res.send(bookings)
    } catch (error) {
        return res.status(400).json(error)
    }
})
module.exports=router