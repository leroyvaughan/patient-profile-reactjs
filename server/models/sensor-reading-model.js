const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var dynamicSchema = function (collectionName) {

    const sensorReading = new Schema(
        {
            "date": { type: String, required: true },
            "time_stamp": { type: Number, required: true },
            "CollectionType": { type: String, required: true },
            "SensorData": { type: Array, required: true },

        }
    );

    //setting database schema model. Params: (collectionName, schemaName)
    let elModelo;

    try {
        elModelo = mongoose.model(collectionName, sensorReading);
    }
    catch (e) {
        elModelo = mongoose.model(collectionName);
    }

    return elModelo;


}

module.exports = dynamicSchema;