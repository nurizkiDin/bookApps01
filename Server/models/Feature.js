const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const featureSchema = new mongoose.Schema({
    featureName: {
        type: String,
        required: [true, "Please Input Feature Name!"]
    },
    qty: {
        type: Number,
        required: [true, "Please Input Feature Quality!"]
    },
    imageUrl: {
        type: String,
        required: true
    },
    item: [{
        type: ObjectId,
        ref: "Item"
    }]
});

module.exports = mongoose.model("Feature", featureSchema);