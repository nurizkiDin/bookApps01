const Item = require('../models/Item');
const Booking = require('../models/Booking');

module.exports = {
    viewDashboard : async(req, res) => {
        try {
            let sumBooked, sumProcess, sumReject, sumApprove, sumItem;
            const totalBooked = await Booking.find();
            const process = await Booking.find({ "payments.status" : "Process" });
            const reject = await Booking.find({ "payments.status" : "Reject" });
            const accept = await Booking.find({ "payments.status" : "Accept" });
            const item = await Item.find();

            totalBooked.length != 0 ? (sumBooked = totalBooked.length) : (sumBooked = 0);
            process.length != 0 ? (sumProcess = process.length) : (sumProcess = 0);
            reject.length != 0 ? (sumReject = reject.length) : (sumReject = 0);
            accept.length != 0 ? (sumApprove = accept.length) : (sumApprove = 0);
            item.length != 0 ? (sumItem = item.length) : (sumItem = 0);

            res.status(200).json({
                "booked" : String(sumBooked),
                "process" : String(sumProcess),
                "reject" : String(sumReject),
                "accept" : String(sumApprove),
                "item" : String(sumItem),
            });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
}