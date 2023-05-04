const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const About = require("../model/aboutModel")
module.exports ={
    create:async(req, res)=>{
        let about = await About.find();
        if(about.length<1){
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
             
            const newAbout = new About({
                teachers: fields.teachers,
                students: fields.students, 
                courses: fields.courses,
                years:fields.years
                })
    
                newAbout.save().then((savedData) => {
                    console.log("Data saved", savedData)
                    res.status(200).json({ success: true, data: savedData })
                }).catch(e => {
                    res.status(500).json({ success: false, message: "Error in Saving About Details" })
                })         
              
                
            })
        }else{
            res.status(500).json({ success: false, message: "About is already there, You can go for update" })
        }
    },
    getAll:async(req, res)=>{
         try {
            const data = await About.find();
            res.status(200).json({ success: true, data: data})
         } catch (error) {
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         }
    },
    delete:(req, res)=>{
        console.log(req.params)
        
        About.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
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
                teachers: fields.teachers,
                students: fields.students, 
                courses: fields.courses,
                years:fields.years
                }
    
        About.findOneAndUpdate({_id:req.params.id}, 
            {$set:fieldsData}).then((updatedData)=>{
          
            res.status(200).json({success: true,message: "Data Updated Successfully"})
        }).catch((e)=>{
            console.log("Error in update", e)
            res.status(400).json({success: false, message: "Failed Update"})
        })

    })
}


}