/********************************************************************
    Use this class to get the PATIENT INFORMATION
*********************************************************************/

const Patient = require('../../models/patient-model');


module.exports = function () {
    const self = this;

    self.get = function (pID) {
        return _get(pID);
    };

    let _get = function (pID) {
        return new Promise((resolve, reject) => {
            console.log("patient-info get()...");

            Patient.find(
                { "patientId": { $eq: pID } },
                {
                    "_id": 0,
                    "patientId": 1,
                    "name": 1,
                    "gender": 1,
                    "dob": 1,
                    "age": 1,
                    "careProvider": 1,
                    "ethnicity": 1
                },

                (err, patient) => {
                    if (err) {
                        return reject("Err in patient-info:\t" + err);
                    }

                    if (isNull(patient)) {
                        return resolve(null);
                    }

                    //stringify schema model to 'purify' data to model spec
                    let jsonData = JSON.stringify(patient[0]);

                    //send parsed data
                    return resolve(JSON.parse(jsonData));
                });
        });
    };


};