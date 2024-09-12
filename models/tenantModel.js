const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    tTitle: String,
    tFirstname: String,
    tLastname: String,
    tPhone: String,
    tEmail: String,
    tAddress1: String,
    tAddress2: String,
    tTown: String,
    tCounty: String,
    tEircode: String,
});

module.exports = {
    Tenant: mongoose.model('Tenant', tenantSchema)
};