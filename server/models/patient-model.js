const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        name: { type: Array, required: true },
        patientId: { type: String, required: true },
        gender: { type: String, required: true },
        dob: { type: String, required: true },
        age: { type: Number, required: true },
        careProvider: { type: Array, required: true },
        ethnicity: { type: String, required: true },
    }
);

//setting database schema model. Params: (collectionName, schemaName)
//must add third param as singular for mocha testing which will pluralize it...
module.exports = mongoose.model('patient_info', Patient, 'patient_info');