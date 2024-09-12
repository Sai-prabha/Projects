const express = require('express');
const router = express.Router();
const {Tenant} = require('../models/tenantModel');
const { getTenants, createTenant, updateTenant, deleteTenant } = require('../controllers/tenantController');

router.get('/', getTenants);
router.get('/:id', getTenants);

router.post('/', createTenant);

router.patch('/:id', updateTenant);

router.delete('/:id', deleteTenant);

module.exports = router;