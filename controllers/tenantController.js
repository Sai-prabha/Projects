const {Tenant} = require('../models/tenantModel');

const getTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTenant = async (req, res) => {
    const newTenant = new Tenant(req.body);
    try {
        const savedTenant = await newTenant.save();
        res.status(201).json(savedTenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTenant = async (req, res) => {
    try {
        const updatedTenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTenant);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTenant = async (req, res) => {
    try {
        await Tenant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tenant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTenants,
    createTenant,
    updateTenant,
    deleteTenant
};