const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const welcomeSchema = new Schema({
    content: { type: String, required: true}
})


module.exports = mongoose.model("Welcome", welcomeSchema)