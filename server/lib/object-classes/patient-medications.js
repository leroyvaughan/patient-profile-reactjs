/********************************************************************
    Use this class to get the patient MEDICATIONS
*********************************************************************/
const Medications = require('../../models/medications-model');


module.exports = function (db) {
    const self = this;

    self.get = function (pID) {
        return _get(pID);
    }

    let _get = function (pID) {
        return new Promise((resolve, reject) => {
            console.log("patient-medications.get()...");

            Medications.find(
                { "patientId": { $eq: pID } },
                {
                    "_id": 0, "medications.description": 1,
                    "medications.dosageInstruction": 1, "total": 1
                },

                (err, meds) => {

                    if (err) {
                        return reject("Err in patient-medications:\t" + err);
                    }

                    if (isNull(meds)) {
                        return reject("no data");
                    }

                    let jsonData = JSON.stringify(meds[0]);
                    return resolve(JSON.parse(jsonData));
                });
        });
    };


};

