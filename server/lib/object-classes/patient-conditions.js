/********************************************************************
    Use this class to get the patient CONDITIONS 
*********************************************************************/


const Conditions = require('../../models/conditions-model');


module.exports = function () {
    const self = this;

    self.get = function (pID) {
        return _get(pID);
    };


    let _get = function (pID) {
        return new Promise((resolve, reject) => {
            console.log("patient-conditions get()...");

            Conditions.find(
                { "patientId": { $eq: pID } },
                {
                    "_id": 0, "total": 1, "conditions.description": 1,
                    "conditions.dateRecorded": 1, "conditions.category.text": 1,
                    "total": 1
                },

                (err, conditions) => {
                    if (err) {
                        return reject("Err in patient-conditions:\t" + err);
                    }

                    if (isNull(conditions)) {
                        return reject("no data");
                    }


                    let jsonData = JSON.stringify(conditions[0]);
                    return resolve(JSON.parse(jsonData));
                });
        });
    };


};
