const express = require('express');

const patientCtrl = require('../controllers/patient-ctrl');

const router = express.Router();

router.get('/patient/:id', patientCtrl.getPatientById);
router.get('/patients', patientCtrl.getPatients);

module.exports = router;