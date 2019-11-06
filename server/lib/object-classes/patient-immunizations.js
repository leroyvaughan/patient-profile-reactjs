/********************************************************************
    Use this class to get the patient IMMUNIZATIONS 
*********************************************************************/


const Immunizations = require('../../models/immunizations-model');


module.exports = function () {
    const self = this;

    self.get = function (pID) {
        return _get(pID);
    };


    let _get = function (pID) {
        return new Promise((resolve, reject) => {
            console.log("patient-immunizations get()...");

            Immunizations.find(
                { "patientId": { $eq: pID } },
                {
                    "_id": 0, "immunizations.dateRecorded": 1, "immunizations.doseQuantity": 1,
                    "immunizations.site": 1, "immunizations.description": 1, "immunizations.status": 1,
                    "total": 1
                },

                (err, immunizations) => {
                    if (err) {
                        return reject("Err in patient-immunizations:\t" + err);
                    }

                    if (isNull(immunizations)) {
                        return reject("no data");
                    }

                    let jsonData = JSON.stringify(immunizations[0]);
                    return resolve(JSON.parse(jsonData));
                });
        });
    };


};
