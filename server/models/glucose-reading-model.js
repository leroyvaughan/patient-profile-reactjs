const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Patient = new Schema(
    {
        name: { type: Array, required: true },
        patientId: { type: Number, required: true },
        gender: { type: String, required: true },
        dob: { type: String, required: true },
        age: { type: String, required: true },
        careProvider: { type: Array, required: true },
        ethnicity: { type: String, required: true },
    }
)

//setting database schema model. Params: (collectionName, schemaName)
module.exports = mongoose.model('patient_info', Patient)