const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Dates = require("../model/datesModel")
module.exports ={
    create:(req, res)=>{
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
             
            const newDates = new Dates({
                    title: fields.title,
                    date: fields.date,
                    content: fields.content
                })
    
                newDates.save().then((savedData) => {
                    console.log("Data saved", savedData)
                    res.status(200).json({ success: true, data: savedData })
                }).catch(e => {
                    console.log(e, "error")
                    res.status(401).json({ success: false, message: "Error in saving Hotel details" })
                })         
              
                
            })

    },
    getAll:async(req, res)=>{
         try {
            const data = await Dates.find();
            console.log(data, "data got")
            res.status(200).json({ success: true, data: data})
         } catch (error) {
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         }
    },
    delete:(req, res)=>{
        console.log(req.params)
        
        Dates.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
            console.log("Deleted Data", deletedData)
            res.status(200).json({success: true,message: "Data deleted Successfully"})
        }).catch((e)=>{
            console.log("Error Deleting")
            res.status(400).json({success: false, message: "Failed Delete"})
        })

    },
    edit:(req, res)=>{
        console.log("Updated Called");
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
             
            const fieldsData = {
                    title: fields.title,
                    date: fields.date,
                    content: fields.content
                }
    
        console.log(req.body)
        Dates.findOneAndUpdate({_id:req.params.id}, 
            {$set:fieldsData}).then((updatedData)=>{
          
            res.status(200).json({success: true,message: "Data Updated Successfully"})
        }).catch((e)=>{
            console.log("Error in update", e)
            res.status(400).json({success: false, message: "Failed Update"})
        })

    })
}


}