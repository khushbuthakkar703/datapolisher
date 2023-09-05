
const phone_number = require("../model/phonenumber");
const axios = require("axios");
const User = require("../model/user");
const phonenumber = require("../model/phonenumber");
const csv = require('csv-parser')
const fs = require('fs')
const CsvParser = require("json2csv").Parser;
const Notificationset = require("../model/Notification");


module.exports.uploadcsv = async (req, res, next) => {
    try {
        const { datacsv } = req.body;

        const response = phone_number.insertMany(datacsv, (err, data) => {
            if (err) {
                res.status(400).json({ msg: "error", Status: 400, Success: false, data: "" });

            } else {
                res.status(200).json({ msg: "Upload successful !", Status: 200, Success: true, data: "" });
            }
        });


    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.numberidentity = async (req, res, next) => {
    const { phone_number, id } = req.body;
    try {
        var body = { "phone_number": phone_number, "feature": "fs5" }
        axios.post(process.env.SYNIVERSE_API, body, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}` } })
            .then(async (response) => {
                const set = await User.findByIdAndUpdate(id.toString(), { updated_date: new Date(), feature: "fs5", mobilenumber: phone_number, mobileverfiy: true, }, {
                    new: true,
                });

                const notificationdata = await new Notificationset({
                    message: response.data.numberidentity.validity === "true" ? phone_number + " phone number valid" : phone_number + " phone number Invalid",
                    type: "Phonecheck",
                    userId: id
                });
                const responseset = await notificationdata.save();
                const notificationlist = await Notificationset.find({ userId: id });
                return res.status(200).json({ msg: "Phonenumber valid successfully !", Success: true, Status: 200, data: response.data, notificationlist: notificationlist ? notificationlist : [] });
            })
            .catch((error) => {
                return res.status(400).json({ msg: error.message, Success: false, Status: 500 });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.phnototallength = async (req, res, next) => {
    const { pageskip, pagelimit, search } = req.body;
    try {

        if (search) {
            var query = { $or: [{ "EMAIL": { $regex: new RegExp(search, "gi") } }, { "FIRST NAME": { $regex: new RegExp(search, "gi") } }, { "LAST NAME": { $regex: new RegExp(search, "gi") } }, { "PHONE": { $regex: new RegExp(search, "gi") } }] }
            phone_number.find(query).count(async (error, numOfDocs) => {
                var skip = 0;
                if (pageskip) {
                    skip = pageskip * pagelimit;
                }
                const dataset = await phonenumber.find(query).skip(skip).limit(pagelimit);
                res.status(200).json({ msg: "Successful !", Status: 200, Success: true, length: numOfDocs, data: dataset });
            });
        }
        else {
            phone_number.find().count(async (error, numOfDocs) => {
                var skip = 0;
                if (pageskip) {
                    skip = pageskip * pagelimit;
                }
                const dataset = await phonenumber.find().skip(skip).limit(pagelimit);
                res.status(200).json({ msg: "Successful !", Status: 200, Success: true, length: numOfDocs, data: dataset });
            }, err => {
                res.status(500).json({ msg: "Successful !", Status: 200, Success: true, length: numOfDocs, data: dataset });
            });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.deleteduplicate = async (req, res, next) => {
    try {
        var duplicatesIds = [];
        var result = await phone_number.aggregate([
            {
                "$group": {
                    _id: { PHONE: "$PHONE" },
                    dups: { $addToSet: "$_id" },
                    count: { $sum: 1 }
                }
            },
            {
                "$match": {
                    count: { "$gt": 1 }
                }
            }
        ], {
            allowDiskUse: true
        })
        await result.forEach(async (doc) => {
            doc.dups.shift();
            doc.dups.forEach(function (dupId) {
                duplicatesIds.push(dupId);
            })
        })
        await phone_number.remove({ _id: { $in: duplicatesIds } })
        await res.status(200).json({ msg: "Upload successful !", Status: 200, Success: true, data: "" });
    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.download = (req, res) => {
    phone_number.find({}).then((objs) => {
        let tutorials = [];
        objs.forEach((obj) => {
            tutorials.push({ "LAST NAME": obj["LAST NAME"], "FIRST NAME": obj["FIRST NAME"], "PHONE": obj["PHONE"], "ALT PHONE": obj["ALT PHONE"], "EMAIL": obj["EMAIL"], "ADDRESS": obj["ADDRESS"], "CITY": obj["CITY"], "STATE": obj["STATE"], "ZIP": obj["ZIP"], "COUNTRY": obj["COUNTRY"], "RESORT": obj["RESORT"], "BEST TIME TO CALL": obj["BEST TIME TO CALL"] });
        });
        const csvFields = ["LAST NAME", "FIRST NAME", "PHONE", "ALT PHONE", "EMAIL", "ADDRESS", "CITY", "STATE", "ZIP", "COUNTRY", "RESORT", "BEST TIME TO CALL"];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(tutorials);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=download.csv");
        res.status(200).end(csvData);
    });
};

