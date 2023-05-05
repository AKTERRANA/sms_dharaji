const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Gallery = require("../model/galleryModel")
module.exports ={
    create:(req, res)=>{
        let image ="";
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
              const photo = files.image;
              
                let oldPath = photo.filepath;
                let originalFileName =photo.originalFilename.replace(" ", "_");
                let newPath = path.join(__dirname,"../",'public', 'upload','gallery') + '/' + originalFileName;
               
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) {
                        console.log(err);
                    }

                image = `gallery/${originalFileName}`;
                const newGallery = new Gallery({
                    imgUrl: image,
                    title: fields.title
                })
    
                newGallery.save().then((savedData) => {
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
        console.log("Called Gallery")
        Gallery.find().then(resp=>{
            res.status(200).json({ success: true, data: resp})
        }).catch(error=>{
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         })

    },
    delete:async(req, res)=>{
        const image =await Gallery.findById({_id:req.params.id});

        const filePath = path.join(__dirname,"../",'public', 'upload') + '/' + image.imgUrl;
        fs.unlink(filePath, (err=>{
            if(err){
                console.log(err)
                res.status(409).json({success: false, message: "Failed Deletion"})
            }else{

        Gallery.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
            console.log("Deleted Data", deletedData)
            res.status(200).json({success: true,message: "Data deleted Successfully"})
        }).catch((e)=>{
            console.log("Error Deleting")
            res.status(400).json({success: false, message: "Failed Delete"})
        })

    }}
    ))

    }

}