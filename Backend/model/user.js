const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: [true, "This user alread"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("This email id invalid formate !");
            }
        },
    },
    name: {
        type: String,
        require: true,
        unique: [true, "This username already exist !"],
    },
    authcode: {
        type: String,
        default: null
    },
    password: {
        type: String,
        require: true,
    },
    status: {
        type: Number,
        require: true,
        default: 0
    },
    usertype: {
        type: Number,
        require: true,
        default: 0
    },
    authcodeexp: {
        type: Date,
        default: null
    },
    authusercode: {
        type: String,
        default: null
    },
    authusercodeexp: {
        type: Date,
        default: null
    },
    apikey: {
        type: String,
        default: null
    },
    feature: {
        type: String,
        default: null
    },
    mobilenumber: {
        type: String,
        default: null
    },
    mobileverfiy: {
        type: Boolean,
        default: false
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


module.exports = mongoose.model('user', userSchema)