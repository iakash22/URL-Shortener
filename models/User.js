const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["Normal", "Admin"],
        default : "Normal"
    },
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);