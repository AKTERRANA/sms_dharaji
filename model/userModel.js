const { default: mongoose, model} = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: { type: String, required:true},
    username: {type: String, required: true},
    password: {type: String, required:true}
})

module.exports = { User:model("user", userSchema)}