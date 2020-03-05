const mongoose = require('./db');

let partnerShema = mongoose.Schema({
    name: String,
    link: String,
    photo: String,
});

const PartnerModel = mongoose.model("partners", partnerShema);

module.exports = PartnerModel;