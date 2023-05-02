const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const News = require("../model/newsModel")
module.exports ={
    create:(req, res)=>{
        let image ="";
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
              const photo = files.image;
                // console.log(photo, "photo")
                let oldPath = photo.filepath;
                let newPath = path.join(__dirname,"../",'public', 'upload','hotelImages') + '/' + photo.originalFilename;
               
                let rawData = fs.readFileSync(oldPath)
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(photo.originalFilename, "original file name")
                    image = `hotelImages/${photo.originalFilename}`;
                
                const newNews = new News({
                    title: fields.title,
                    imgUrl: image,
                    content: fields.content
                })
    
                newNews.save().then((savedData) => {
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
    getAll:async(req, res)=>{
        console.log("Called")
         try {
            const data = await News.find();
            res.status(200).json({ success: true, data: data})
         } catch (error) {
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         }
    },
    delete:(req, res)=>{
        console.log(req.params)
        News.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
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
                    content: fields.content
                }
    
        console.log(req.body)
        News.findOneAndUpdate({_id:req.params.id}, 
            {$set:fieldsData}).then((updatedData)=>{
          
            res.status(200).json({success: true,message: "Data Updated Successfully"})
        }).catch((e)=>{
            console.log("Error in update", e)
            res.status(400).json({success: false, message: "Failed Update"})
        })

    })
}

}