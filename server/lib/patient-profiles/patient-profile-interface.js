module.exports = function () {
    const self = this;


    //public method
    self.getPatient = function (pID) {
        return _getPatient(pID);
    };

    self.getPatients = function () {
        return _getPatients();
    }

    let _getPatient = (pID) => {
        return new Promise((resolve, reject) => {

            try {
                const PatientView = require('./patient-view-db.js');
                const patientView = new PatientView(pID);

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
                reject("Err in patient-profile-interface.getPatient({id}):\t" + e);
            }
        });
    };


    let _getPatients = () => {
        return new Promise((resolve, reject) => {

            try {
                const pInfo = require('../object-classes/patient-info');
                let patientInfo = new pInfo();

                patientInfo.getAll()
                    .then((data) => {
                        resolve(data);
                    })
                //catch error in catch() block???
                // .catch((err) => {
                //     reject(err);
                // });
            }
            catch (e) {
                //bubble up the error
                reject("Err in patient-profile-interface.getPatients():\t" + e)
            }

        });
    };











};//end returnObj