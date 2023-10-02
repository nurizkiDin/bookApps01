const mongoose = require('mongoose');

const connectDB = async() => {
    try{
    const con = await mongoose.connect("mongodb+srv://admin:PhpDhWKIHcsoAVuX@nurizki.mnwy73b.mongodb.net/bookingDB?retryWrites=true&w=majority", {
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