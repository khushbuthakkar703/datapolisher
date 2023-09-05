const Notification = require("../model/Notification");
const User = require("../model/user")
const objectId = require('mongodb').ObjectID;
module.exports.Notificationlist = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const notificationlist = await Notification.find({ userId, status: '0' });
        const Userdata = await User.findOne({ id: userId });

        res.status(200).json({
            data: {
                "Notification": notificationlist ? notificationlist : [],
                "Userdata": {
                    "email": Userdata.email ? Userdata.email : "",
                    "name": Userdata.name ? Userdata.name : "",
                    "mobilenumber": Userdata.mobilenumber ? Userdata.mobilenumber : "",
                }
            },
            Status: 200,
            Success: true,
            msg: "Success",
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};



module.exports.Notificationcreate = async (req, res, next) => {
    try {
        const { message, type, userId } = req.body;
        const notificationdata = new Notification({
            message,
            type,
            userId
        });
        const response = await notificationdata.save();
        res
            .status(200)
            .json({ msg: " Successful !", Status: 200, Success: true, data: response });

    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }

};


module.exports.Notificationupdate = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const set = await Notification.updateMany({ "userId": userId }, { "$set": { "readnotification": true } });
        const Userdata = await User.findOne({ id: userId });
        const notificationlist = await Notification.find({ userId, status: '0' });
        res.status(200).json({
            data: {
                "Notification": notificationlist ? notificationlist : [],
                "Userdata": {
                    "email": Userdata.email ? Userdata.email : "",
                    "name": Userdata.name ? Userdata.name : "",
                    "mobilenumber": Userdata.mobilenumber ? Userdata.mobilenumber : "",
                }
            },
            Status: 200,
            Success: true,
            msg: "Success",
        });

    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }

};


module.exports.Notificationdelete = async (req, res, next) => {
    try {
        const { userId, notificationId } = req.body;
        const set = await Notification.findByIdAndUpdate(notificationId, { updated_date: new Date(), status: '1' }, {
            new: true,
        });
        const Userdata = await User.findOne({ id: userId });
        const notificationlist = await Notification.find({ userId, status: '0' });
        res.status(200).json({
            data: {
                "Notification": notificationlist ? notificationlist : [],
                "Userdata": {
                    "email": Userdata.email ? Userdata.email : "",
                    "name": Userdata.name ? Userdata.name : "",
                    "mobilenumber": Userdata.mobilenumber ? Userdata.mobilenumber : "",
                }
            },
            Status: 200,
            Success: true,
            msg: "Success",
        });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }

};

module.exports.NotificationAggregate = async (req, res, next) => {
    try {
        const { userId } = req.body;
        console.log("userId", userId)
        Notification.aggregate([
            { $match: { type: 'Phonecheck' } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "User",
                },
            },
            {
                $unwind: "$User",
            },
        ])
            .then((result) => {

                res
                    .status(200)
                    .json({ msg: " Successful !", Status: 200, Success: true, data: result });
            })
            .catch((error) => {
                console.log("133-----------", error)
                return res.status(error.error.status).json({ msg: error.message, Status: error.error.status });
            });
    }
    catch (error) {

        return res.status(500).json({ msg: error.message, Status: 500 });
    }

};