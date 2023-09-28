const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please Input First Name!"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Please Input Last Name!"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please Input Email!"],
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw Error("Please Provide a valid Email address")
            }
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Please Input Phone Number!"]
    }
});

module.exports = mongoose.model("Customer", customerSchema);