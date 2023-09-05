const mongoose = require('mongoose');
const { Schema } = mongoose;
const notificationSchema = new Schema({
    message: {
        type: String,
        required: true,
        default: ''
    },
    type: {
        type: String,
        required: true,
        default: ''
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    readnotification: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        required: true,
        default: '0'
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    updated_date: {
        type: Date,
        default: new Date()
    }
})


module.exports = mongoose.model('notification', notificationSchema)