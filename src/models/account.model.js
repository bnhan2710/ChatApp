const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true
    },

    password: {
        type: String,
        maxlength: 1024,
        minlength: 6
    },

    email: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 10,
        unique: true
    },

    fullName:{
        type: String,
        maxlength: 50,
        minlength: 10,
    }
} , { 
    timestamps: true ,
    versionKey: false}
)

module.exports = mongoose.model('account', accountSchema)