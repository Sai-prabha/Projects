const express = require('express');
const router = express.Router();
const {Landlord} = require('../models/landLordModel');
const {getLandLords, createLandLord, updateLandLord, deleteLandLord} = require('../controllers/landLordController');

router.get('/', getLandLords);
router.get('/:id', getLandLords);

router.post('/', createLandLord);

router.patch('/:id',updateLandLord);

router.delete('/:id',deleteLandLord);

module.exports = router;