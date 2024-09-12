const mongoose = require('mongoose');
const { Landlord } = require('./landLordModel');
const { Tenant } = require('./tenantModel');

const contractSchema = new mongoose.Schema({
    contractDate: Date, 
    propertyAddress: String,
    cLandlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landlord'
    },
    cTenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }],
    monthlyFee: Number,
    propertyDoorNumber: String,
    contractLength: String,
    propertyType: String,
});

module.exports = {
    Contract: mongoose.model('Contract', contractSchema)
};
