//import module
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// connection mongoDB
const connectDB = require('./database/db');
connectDB();

//import router
const categoryRouter = require('./router/categoryRouter');
const bankRouter = require('./router/bankRouter');
const itemRouter = require('./router/itemRouter');
const featureRouter = require('./router/featureRouter');
const infoRouter = require('./router/infoRouter');
const customerRouter = require('./router/customerRouter');
const bookingRouter = require('./router/bookingRouter');
const userRouter = require('./router/userRouter');
const dashboardRouter = require('./router/dashboardRouter');
const homeRouter = require('./router/homeRouter');

//setting cors, morgan
app.use(cors());
app.use(logger('dev'));
//setup post
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Authorization, authorization, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

//setup public url for file
app.use(express.static(path.join(__dirname, 'public')));

//url
app.use('/api/category', categoryRouter);
app.use('/api/bank', bankRouter);
app.use('/api/item', itemRouter);
app.use('/api/item/feature', featureRouter);
app.use('/api/item/info', infoRouter);
app.use('/api/customer', customerRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);

//client
app.use('/api/client', homeRouter);

app.get('/', (req, res) => {
    res.send('hlo');
});

app.listen(port, () => {
    console.log(`app listening to http://localhost:${port}`);
});