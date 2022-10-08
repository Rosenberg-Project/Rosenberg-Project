const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    user_ID: {
        type: String,
        required: true,
        unique: true,
    },
    password_ID: {
        type: String,
        required: true,
    },
    designation_ID: {
        type: String,
        required: true,
    },
});

const actions = mongoose.model("access-accounts",accountsSchema);
module.exports = actions;