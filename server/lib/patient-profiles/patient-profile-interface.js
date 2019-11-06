var PatientView = require('./patient-view-db.js');



module.exports = function () {
    const self = this;

    self.getPatient = function (pID) {
        return _getPatient(pID);
    };

    let _getPatient = (pID) => {
        return new Promise((resolve, reject) => {

            try {
                var patientView = new PatientView(pID);

                patientView.buildPatientObject()
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject("error in patient-profile-interface.getPatient: " + err);
                    });
            }
            catch (e) {
                //bubble up the error
                reject("Err in patient-profile-interface:\t" + e);
            }
        });
    };
};//end returnObj




