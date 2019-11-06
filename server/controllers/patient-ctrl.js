const Patient = require('../models/patient-model');


getPatientById = (req, res) => {

    // res.status(200).send();

    const PatientInterface = require('../lib/patient-profiles/patient-profile-interface');
    let newPatient = new PatientInterface();

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
    await Patient.find(
        {},
        { project: { "_id": 0, "name": 1, "patientId": 1 } },
        (err, patients) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!patients.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Patient not found` })
            }

            return res.status(200).json({
                success: true,
                data: patients
            })
        }).catch(err => console.log(err))
}

module.exports = {
    getPatients,
    getPatientById,
}