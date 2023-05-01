const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    author: { type: String, required: true},
    imgUrl: { type: String, required: true}, 
    degree: { type: String, required: true},
    experience: {type: String, required: true}
})

module.exports = mongoose.model("Admin", adminSchema)