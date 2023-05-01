const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infraSchema = new Schema({
    title: { type: String, required: true},
    imgUrl: { type: String, required: true}, 
    content: { type: String, required: true}
})

module.exports = mongoose.model("Infra", infraSchema)