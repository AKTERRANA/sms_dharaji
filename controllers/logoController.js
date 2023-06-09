const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Logo = require("../model/logoModel")
module.exports ={
    create:(req, res)=>{
        let image ="";
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
              const photo = files.image;
              
                let oldPath = photo.filepath;
                let originalFileName =photo.originalFilename.replace(" ", "_");
                let newPath = path.join(__dirname,"../",'public', 'upload','utility') + '/' + originalFileName;
               
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) {
                        console.log(err);
                    }

                image = `utility/${originalFileName}`;
                const newLogo = new Logo({
                    imgUrl: image
                })
    
                newLogo.save().then((savedData) => {
                    console.log("Data saved", savedData)
                    res.status(200).json({ success: true, data: savedData })
                }).catch(e => {
                    console.log(e, "error")
                    res.status(401).json({ success: false, message: "Error in saving Hotel details" })
                })         
              
                })

            })

    },
    getLogo:(req, res)=>{
        Logo.find().then(resp=>{
            res.status(200).json({ success: true, data: resp})
        }).catch(error=>{
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         })

    },
    update:async(req, res)=>{
        console.log("Update Called")
        const logo = await Logo.findById({_id: req.params.id});
        console.log(logo)
        const filePath = path.join(__dirname,"../",'public', 'upload') + '/' + logo.imgUrl;
        fs.unlink(filePath, (err=>{
            if(err){
                console.log(err)
                res.status(409).json({success: false, message: "Failed Deletion"})
            }else{

    
        let image ="";
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
          const photo = files.image;
          
            let oldPath = photo.filepath;
            let originalFileName =photo.originalFilename.replace(" ", "_");
            let newPath = path.join(__dirname,"../",'public', 'upload','utility') + '/' + originalFileName;
           
            let rawData = fs.readFileSync(oldPath);
            fs.writeFile(newPath, rawData, function (err) {
                if (err) {
                    console.log(err);
                }

            image = `utility/${originalFileName}`;
            Logo.findOneAndUpdate({_id:req.params.id}, {$set:{imgUrl: image}}).then((updatedData)=>{
                res.status(200).json({ success: true, data: updatedData })
                }).catch(e => {
                    console.log(e, "error")
                    res.status(401).json({ success: false, message: "Error in Updating Logo" })
                })         
              
        
            })

        })
    }
        }))
    


    }

}