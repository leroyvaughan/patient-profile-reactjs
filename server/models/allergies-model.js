const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientAllergies = new Schema(
    {
        allergies: { type: Array, required: true },
        total: { type: Number, required: true }
    }
);

//setting database schema model. Params: (collectionName, schemaName)
module.exports = mongoose.model('allergies', PatientAllergies);