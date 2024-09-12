const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
    lTitle: String,
    lFirstname: String,
    lLastname: String,
    lPhone: String,
    lEmail: String,
    lAddress1: String,
    lAddress2: String,
    lTown: String,
    lCounty: String,
    lEircode: String,
    DOB: Date,
    councilPerm: Boolean,
    tenantPerm: Boolean,
});

module.exports = {
    Landlord: mongoose.model('Landlord', landlordSchema)
};