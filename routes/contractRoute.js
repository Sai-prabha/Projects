const express = require('express');
const router = express.Router();
const {Contract} = require('../models/contractModel');
const { getContracts, createContract, updateContract, deleteContract } = require('../controllers/contractController');

router.get('/', getContracts);
router.get('/:id', getContracts);

router.post('/', createContract);

router.patch('/:id', updateContract);

router.delete('/:id', deleteContract);

router.get('/', (req, res) => {
    Contract.find()
        .populate('cLandlord', 'lFirstname lLastname')
        .populate('cTenants', 'tFirstname tLastname')
        .then(contracts => res.json(contracts))
        .catch(err => res.status(500).json({ message: 'Error fetching contracts', error: err }));
});

module.exports = router;