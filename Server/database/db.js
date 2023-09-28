const mongoose = require('mongoose');

const connectDB = async() => {
    try{
    const con = await mongoose.connect("mongodb://localhost:27017/booking01DB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });

    console.log(`mongodb connected : ${con.connection.host}:${con.connection.port}`);
    }
    catch(error) {
        console.error(`error ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;