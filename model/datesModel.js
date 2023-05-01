const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const datesSchema = new Schema({
    title: { type: String, required: true},
    date: { type: String, required: true}, 
    content: { type: String, required: true}
})

module.exports = mongoose.model("Dates", datesSchema)