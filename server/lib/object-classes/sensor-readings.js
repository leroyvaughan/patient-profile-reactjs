/********************************************************************
    Use this class to get the patient SENSOR READINGS
*********************************************************************/


const SensorReadings = require('../../models/sensor-reading-model');


module.exports = function (pID) {
    const self = this;
    const sdUID = pID;

    self.get = function (cType) {
        return _get(cType);
    };


    let _get = function (cType) {
        return new Promise((resolve, reject) => {
            console.log("patient-sensorReadings get(" + cType + ")...");

            let collectionName = cType;
            let fieldProjection = {};

            switch (cType) {
                case "bp":
                    collectionName = "bloodPressure";
                    fieldProjection = {
                        $project: {
                            "_id": 0,
                            "time_stamp": 1,
                            "Systolic": "$SensorData.Systolic",
                            "Diastolic": "$SensorData.Diastolic",
                            "HeartRate": "$SensorData.HeartRate"
                        }
                    };

                    break;

                case "glucose":
                    fieldProjection = {
                        $project: {
                            "_id": 0,
                            "time_stamp": 1,
                            "BG": "$SensorData.BG"
                        }
                    };
                    break;

                case "weight":
                    fieldProjection = {
                        $project: {
                            "_id": 0,
                            "time_stamp": 1,
                            "BMI": "$SensorData.BMI",
                            "Weight": "$SensorData.WeightValue",
                        }
                    };
                    break;

                default:
                    return reject("Err in sensor-readings: \tno collection type resolved");
            }


            //now query the db
            let schemaModel = new SensorReadings(collectionName);
            const query =
            {
                $match: {
                    "sensorData_userID": { $eq: sdUID },
                    "CollectionType": cType
                }
            };

            //making the actual db call/query here
            schemaModel.aggregate([
                query,
                { $unwind: "$SensorData" },
                fieldProjection
            ],
                (err, sensorReadings) => {
                    if (err) {
                        return reject("Err in sensor-readings:\t" + err);
                    }

                    if (isNull(sensorReadings)) {
                        return reject(null);
                    }

                    let jsonData = JSON.stringify(sensorReadings);
                    return resolve(JSON.parse(jsonData));
                }
            );
        });
    };


};
