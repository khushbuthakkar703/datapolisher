const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const phoneSchema = new Schema({
    "LAST NAME": {
        type: String,
        default: "",
        index: true
    },
    "FIRST NAME": {
        type: String,
        require: true,
        index: true
    },
    "PHONE": {
        type: String,
        default: "",
        index: true
    },
    "ALT PHONE": {
        type: String,
        default: "",
        index: true
    },
    "EMAIL": {
        type: String,
        default: "",
        index: true,

    },
    "ADDRESS": {
        type: String,
        default: "",
        index: true
    },
    "CITY": {
        type: String,
        default: "",
        index: true
    },
    "STATE": {
        type: String,
        default: "",
        index: true
    },
    "ZIP": {
        type: String,
        default: "",
        index: true
    },
    "COUNTRY": {
        type: String,
        default: "",
        index: true
    },
    "RESORT": {
        type: String,
        default: "",
        index: true
    },
    "BEST TIME TO CALL": {
        type: String,
        default: "",
        index: true
    },
    created_date: {
        type: Date,
        default: new Date(),
        index: true
    },
    updated_date: {
        type: Date,
        default: new Date(),
        index: true
    }
})


module.exports = mongoose.model('phonenumber', phoneSchema)