/********************************************************************
    Use this class to get the patient PROCEDURES
*********************************************************************/


const Procedures = require('../../models/procedures-model');


module.exports = function () {
    const self = this;

    self.get = function (pID) {
        return _get(pID);
    };

    let _get = function (pID) {
        return new Promise((resolve, reject) => {
            console.log("patient-procedures get()...");

            Procedures.find(
                { "patientId": { $eq: pID } },
                {
                    "_id": 0, "procedures.status": 1, "procedures.description": 1,
                    "total": 1
                },

                (err, procedures) => {
                    if (err) {
                        return reject("Err in patient-procedures:\t" + err);
                    }

                    if (isNull(procedures)) {
                        return reject("no data");
                    }

                    let jsonData = JSON.stringify(procedures);
                    return resolve(JSON.parse(jsonData));
                });
        });
    };


};
