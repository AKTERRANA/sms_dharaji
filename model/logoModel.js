const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logoSchema = new Schema({
    imgUrl: { type: String, required: true}
})


module.exports = mongoose.model("Logo", logoSchema)