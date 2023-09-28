const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        trim: true,
        required: [true, "Please Input Bank Name!"]
    },
    accountNumber: {
        type: String,
        required: [true, "Please Input accountNumber!"]
    },
    accountHolder: {
        type: String,
        required: [true, "Please Input accountHolder!"]
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Bank", bankSchema);