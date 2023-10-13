const Bank = require('../models/Bank');
const Item = require('../models/Item');
const Info = require('../models/Info');
const Category = require('../models/Category');

module.exports = {
    homePage : async(req, res) => {
        try {
            // ambil data item paling laris berdasarkan sumBooked
            const hotItem = await Item.find()
                .select("_id itemName location itemPrice unit imageId sumBooked isPopular")
                .limit(4)
                .populate({
                    path: "image",
                    select: "_id imageUrl",
                    option: {
                        sort: {
                            sumBooked: -1
                        }
                    }
                });

            const testimony = await Info.find({ type: "Testimony", isHighlight : true })
                .select("_id infoName type imageUrl description item")
                .limit(3)
                .populate({
                    path: "item",
                    select: "_id itemName location"
                });

            // ---Atlas mongoDB Tier problem : free cloud issue with $where statement---
            // const categoryList = await Category.find({ $where: "this.item.length > 0" })
            // .limit(3)
            // .populate({
            //     path: "item",
            //     select: "_id itemName location itemPrice unit imageId isPopular",
            //     perDocumentLimit: 4,
            //     option: {
            //         sort: {
            //             sumBooked: -1
            //         }
            //     },
            //     populate: {
            //         path: "image",
            //         perDocumentLimit: 1
            //     }
            // });
            const categoryList = await Category.find()
            .limit(3)
            .populate({
                path: "item",
                select: "_id itemName location itemPrice unit imageId isPopular",
                perDocumentLimit: 4,
                option: {
                    sort: {
                        sumBooked: -1
                    }
                },
                populate: {
                    path: "image",
                    perDocumentLimit: 1
                }
            });

            const Hotel = await Category.find({ categoryName: "Hotel" });
            const Event = await Category.find({ categoryName: "Event" });
            const Tour = await Category.find({ categoryName: "Tour Package" });

            const sumHotel = Hotel.reduce((count, current) => count + current.item.length, 0);
            const sumEvent = Event.reduce((count, current) => count + current.item.length, 0);
            const sumTour = Tour.reduce((count, current) => count + current.item.length, 0);

            res.status(200).json({
                summaryInfo : {
                    "sum Hotel" : sumHotel,
                    "sum Event" : sumEvent,
                    "sum Tour" : sumTour
                },
                hotItem,
                categoryList,
                testimony
            });

            // end try
        }
        catch(err) {
            res.status(500).json({ message : err.message });
        }
    },
    detailPage : async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findOne({ _id: id })
                .populate({ path: "category", select: "id categoryName" })
                .populate({ path: "image", select: "id imageUrl" })
                .populate({ 
                    path: "info", 
                    match: { 
                        type: { 
                            $in: ["NearBy", "Testimony"] 
                        } 
                    }
                })
                .populate({ path: "feature"});
            const bank = await Bank.find();

            res.status(200).json({
                ...item._doc,
                bank
            });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
}
