const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
      teachers: { type: String, required: true},
    students: { type: String, required: true}, 
    courses: { type: String, required: true},
    years: {type:String, required:true}
})


module.exports = mongoose.model("About", aboutSchema)