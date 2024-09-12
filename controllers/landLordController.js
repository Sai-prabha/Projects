const {Landlord} = require('../models/landLordModel');

const getLandLords = async (req, res) => {
    try {
        const landlords = await Landlord.find();
        res.json(landlords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLandLord = async (req, res) => {
    try {
        const newLandLord = await Landlord.create(req.body);
        const savedLandLord = await newLandLord.save();
        res.status(201).json(savedLandLord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateLandLord = async (req, res) => {
    try {
        const updatedLandlord = await Landlord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLandlord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLandLord = async (req, res) => {
    try {
        await Landlord.findByIdAndDelete(req.params.id);
        res.json({ message: 'Landlord deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLandLords,
    createLandLord,
    updateLandLord,
    deleteLandLord
};