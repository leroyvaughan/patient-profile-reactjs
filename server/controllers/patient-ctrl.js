const Patient = require('../models/patient-model');
const PatientInterface = require('../lib/patient-profiles/patient-profile-interface');
let newPatient = new PatientInterface();


getPatientById = (req, res) => {
    newPatient.getPatient(req.params.id)
        .then((json) => {
            return res
                .status(200)
                .json({ success: true, data: json });
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(404)
                .json({ success: false, error: `Patient not found!` })
        });
};

getPatients = async (req, res) => {
    newPatient.getPatients()
        .then((resp) => {
            return res.status(200).json({
                success: true,
                data: resp //array of json objects
            });
        })
        .catch((err) => {
            //should only fail on code changes and (db is empty)
            return res.status(404).json(
                { success: false, error: `Patients not found` });
        });
};

module.exports = {
    getPatients,
    getPatientById,
}