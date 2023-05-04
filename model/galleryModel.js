const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    imgUrl: { type: String, required: true}
})


module.exports = mongoose.model("Gallery", gallerySchema)