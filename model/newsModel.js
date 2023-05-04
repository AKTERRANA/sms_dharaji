const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: { type: String, required: true},
    imgUrl: { type: String, required: true}, 
    content: { type: String, required: true},
    date:{ type: Date, default: new Date()}
})


module.exports = mongoose.model("News", NewsSchema)