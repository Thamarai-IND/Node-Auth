const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required: true,
        index: true,
    },
    role: {
        type:String,
        default: "employee",
        enum:["employee","admin","manager"]
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);