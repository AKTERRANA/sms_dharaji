const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Contact = require("../model/contactModel")
module.exports ={
    create:async(req, res)=>{
    console.log("contact create")
        let contact = await Contact.find();
        if(contact.length<1){
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
             
            const newContact = new Contact({
                address: fields.address,
                email:  fields.email, 
                phone: fields.phone,
                fb: fields.fb,
                in: fields.in,
                twt: fields.twt,
                })
    
                newContact.save().then((savedData) => {
                    console.log("Data saved", savedData)
                    res.status(200).json({ success: true, data: savedData })
                }).catch(e => {
                    res.status(500).json({ success: false, message: "Error in Saving contact Details" })
                })         
              
                
            })
        }else{
            res.status(500).json({ success: false, message: "contact is already there, You can go for update" })
        }
    },
    getAll:async(req, res)=>{
         try {
            const data = await Contact.find();
            res.status(200).json({ success: true, data: data})
         } catch (error) {
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         }
    },
    delete:(req, res)=>{
        console.log(req.params)
        
        Contact.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
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
                address: fields.address,
                email:  fields.email, 
                phone: fields.phone,
                fb: fields.fb,
                in: fields.in,
                twt: fields.twt,
                }
    
        Contact.findOneAndUpdate({_id:req.params.id}, 
            {$set:fieldsData}).then((updatedData)=>{
          
            res.status(200).json({success: true,message: "Data Updated Successfully"})
        }).catch((e)=>{
            console.log("Error in update", e)
            res.status(400).json({success: false, message: "Failed Update"})
        })

    })
}


}