const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: false
    }
});

exports.module = UserSchema;