const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Admin = require("../model/adminModel")
module.exports ={
    create:(req, res)=>{
        let image ="";
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
              const photo = files.image;
                // console.log(photo, "photo")
                let oldPath = photo.filepath;
                let originalFileName =photo.originalFilename.replace(" ", "_");
                let newPath = path.join(__dirname,"../",'public', 'upload','hotelImages') + '/' + originalFileName;
               
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) {
                        console.log(err);
                    }
                 console.log(photo.originalFilename, "original file name")
                // image = `${photo.originalFilename}`;
                image = `hotelImages/${originalFileName}`;
                const newAdmin = new Admin({
                    author: fields.author,
                    imgUrl: image,
                    degree: fields.degree,
                    experience: fields.experience
                })
    
                newAdmin.save().then((savedData) => {
                    console.log("Data saved", savedData)
                    res.status(200).json({ success: true, data: savedData })
                }).catch(e => {
                    console.log(e, "error")
                    res.status(401).json({ success: false, message: "Error in saving Hotel details" })
                })         
              
                })
            //   body = fields;
                
            })

    },
    getAll:(req, res)=>{
        console.log("Called")
        Admin.find().then(resp=>{
            res.status(200).json({ success: true, data: resp})
        }).catch(error=>{
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         })

    },
    delete:(req, res)=>{
        console.log(req.params)
        Admin.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
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
                author: fields.author,
                degree: fields.degree,
                experience: fields.experience
                }
    
        Admin.findOneAndUpdate({_id:req.params.id}, 
            {$set:fieldsData}).then((updatedData)=>{
          
            res.status(200).json({success: true,message: "Data Updated Successfully"})
        }).catch((e)=>{
            console.log("Error in update", e)
            res.status(400).json({success: false, message: "Failed Update"})
        })

    })
}

}