const express = require('express');
const router = express.Router();

const Schedule = require("../model/userSchedule");
const verifyJwt = require("../middleware/verifyJwt");

router.post('/state',(req,res)=>{  
    const isActive = req.body.isActive;
    console.log(isActive);
    res.status(200).json({message: "Connected"});
})


router.get("/verify",verifyJwt,(req,res)=>{
    console.log("Authorized");
    res.send("Authorized");
})

router.post("/setTime",async(req,res)=>{
    const {isActive, user,dateTime} = req.body;
    const userEmail = user.email;
    try{
        
        if(userSchedule){
            const added = await userSchedule.addData(isActive,dateTime);
            return res.status(201).json({ message: "Data Added", time:added});
        }else{
            const newUserSchedule = new Schedule({email:userEmail,isActive:isActive,time:{checkpoint:dateTime}});
            await newUserSchedule.save();
            res.status(201).json({ message: "user added with data" });
        }
    }catch(error){
        console.log(error);
    }
})

router.post('/getTime', async(req,res)=>{
    const {user} = req.body;
    const userEmail = user.email;
    try{
        const userSchedule = await Schedule.findOne({email: userEmail});
        if(userSchedule){
            return res.status(201).json({user:userSchedule});
        }else{
            return res.status(201).json({message:"No time set"})
        }
    }catch(error){
        console.log(error);
    }
})
module.exports = router;