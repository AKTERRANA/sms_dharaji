const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Welcome = require("../model/welcomeModel")
module.exports ={
    create:async(req, res)=>{
        let welcome = await Welcome.find();
        if(welcome.length<1){
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
             
            const newWelcome = new Welcome({
            content: fields.content
                })
    
                newWelcome.save().then((savedData) => {
                    console.log("Data saved", savedData)
                    res.status(200).json({ success: true, data: savedData })
                }).catch(e => {
                    res.status(500).json({ success: false, message: "Error in Saving welcome Details" })
                })         
              
                
            })
        }else{
            res.status(500).json({ success: false, message: "welcome is already there, You can go for update" })
        }
    },
    getAll:async(req, res)=>{
         try {
            const data = await Welcome.find();
            res.status(200).json({ success: true, data: data})
         } catch (error) {
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         }
    },
    edit:(req, res)=>{
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
             
            const fieldsData = {
                    content: fields.content
                }
    
        console.log(req.body)
        Welcome.findOneAndUpdate({_id:req.params.id}, 
            {$set:fieldsData}).then((updatedData)=>{
          
            res.status(200).json({success: true,message: "Data Updated Successfully"})
        }).catch((e)=>{
            console.log("Error in update", e)
            res.status(400).json({success: false, message: "Failed Update"})
        })

    })
}


}