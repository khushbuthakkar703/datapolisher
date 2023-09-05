const mongoose = require('mongoose');
const { Schema } = mongoose;
const companySchema = new Schema({
    companyname: {
        type: String,
        require: true,
        default: null
    },
    companycity: {
        type: String,
        require: true,
        default: null
    },
    companycountry: {
        type: String,
        require: true,
        default: null
    },
    companystate: {
        type: String,
        require: true,
        default: null
    },
    companyzip: {
        type: String,
        require: true,
        default: null
    },
    companystreet: {
        type: String,
        require: true,
        default: null
    },
    companytype: {
        type: String,
        require: true,
        default: null
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
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


module.exports = mongoose.model('company', companySchema)