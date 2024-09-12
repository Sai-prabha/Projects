const {Contract} = require('../models/contractModel');

const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContract = async (req, res) => {
    try {
        const newContract = await Contract.create(req.body);
        const savedContract = await newContract.save();
        res.status(201).json(savedContract);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateContract = async (req, res) => {
    try {
        const updatedContract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedContract);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteContract = async (req, res) => {
    try {
        await Contract.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contract deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContracts,
    createContract,
    updateContract,
    deleteContract
};