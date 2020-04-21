const mongoose = require('./db');

let adminSchema = mongoose.Schema({
    email: String,
    salt: String,
    token: String,
    password: String,
});

const AdminModel = mongoose.model("admins", adminSchema);

module.exports = AdminModel;