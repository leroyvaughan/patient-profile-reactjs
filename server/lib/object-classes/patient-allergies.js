/********************************************************************
    Use this class to get the patient ALLERGIES 
*********************************************************************/


const Allergies = require('../../models/allergies-model');


module.exports = function () {
    const self = this;

    self.get = function (pID) {
        return _get(pID);
    };


    let _get = function (pID) {
        return new Promise((resolve, reject) => {
            console.log("patient-allergies get()...");

            Allergies.find(
                { "patientId": { $eq: pID } },
                {
                    "_id": 0, "allergies.dateRecorded": 1,
                    "allergies.substance.text": 1, "allergies.criticality": 1,
                    "total": 1
                },

                (err, allergies) => {
                    if (err) {
                        return reject("Err in patient-allergies:\t" + err);
                    }

                    if (isNull(allergies)) {
                        return reject("no data");
                    }

                    var jsonData = JSON.stringify(allergies[0]);
                    return resolve(JSON.parse(jsonData));
                });
        });
    };


};