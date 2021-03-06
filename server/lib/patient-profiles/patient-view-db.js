﻿const pAllergies = require('../object-classes/patient-allergies.js');
const pConditions = require('../object-classes/patient-conditions.js');
const pImmunizations = require('../object-classes/patient-immunizations.js');
const pMedications = require('../object-classes/patient-medications.js');
const pProcedures = require('../object-classes/patient-procedures.js');
const pInfo = require('../object-classes/patient-info.js');
const pSensorReadings = require('../object-classes/sensor-readings');



module.exports = function (patientId) {
    console.log("\r\npatient-view init...");

    const self = this;
    let pObj = {};
    const pID = patientId;

    let allergies = new pAllergies();
    let conditions = new pConditions();
    let immunizations = new pImmunizations();
    let medications = new pMedications();
    let patientInfo = new pInfo();
    let procedures = new pProcedures();
    let sensorReadings = new pSensorReadings(pID);



    //   PUBLIC METHOD THAT GETS ALL RESOURCE DATA FOR A GIVEN PATIENT
    self.buildPatientObject = function () {
        return new Promise((res, rej) => {
            console.log("buildPatientObject()");

            getResourceData()
                .then(() => {
                    //object is built in Promise.Series funcs
                    res(pObj);
                })
                .catch((err) => {
                    rej("Err in buildPatientObject():\t" + err);
                });
        });
    };//end newPatient()


    /// called by buildPatientObject()
    let getResourceData = () => {
        console.log("getResourceData()...");

        return Promise.series([getPatientInfo, getAllergies, getConditions,
            getImmunizations, getMedications, getProcedures, getSensorReadings]);
    }



    /// PRIVATE GET METHODS

    let getAllergies = () => {
        return new Promise((resolve, reject) => {
            console.log("\r\ngetting patient allergies");

            //set empty object, JIC
            pObj.allergies = [];

            allergies.get(pID)
                .then((resp) => {

                    let data = resp.allergies;
                    let tempData = [], descs = [];

                    for (let x = 0; x < data.length - 1; x++) {
                        let curObj = data[x];

                        //get friendly criticality description
                        let criticality = curObj.criticality
                        curObj.criticality = getRiskText(criticality);

                        //make root allergy description 'field'
                        curObj.description = curObj.substance.text;
                        delete curObj.substance;

                        //keep the first item and non-duplicates
                        if (x === 0 || !descs.includes(curObj.description)) {
                            descs.push(curObj.description);
                            tempData.push(curObj);
                        }
                    }

                    //attempt sort of JsonArray items by Description
                    try {
                        tempData.sort(sortJsonByKey("description"));
                    }
                    catch (e) {
                        console.log("err in getAllergies().dataSort:\t" + e);
                    }


                    console.log("allergies filter:\t" + data.length + ">>\t" + tempData.length);

                    pObj.allergies = tempData;

                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };


    let getConditions = () => {
        return new Promise((resolve, reject) => {
            console.log("\r\ngetting patient conditions");

            //set empty object, JIC
            pObj.conditions = [];

            conditions.get(pID)
                .then((resp) => {
                    let data = resp.conditions;
                    let tempData = [], descs = [];

                    //filter out duplicates
                    for (let x = 0; x < data.length - 1; x++) {
                        let curObj = data[x];

                        //keep the first item & non-duplicates
                        if (x === 0 || !descs.includes(curObj.description)) {
                            descs.push(curObj.description);

                            //make friendly date for display
                            curObj.dateRecorded = getDateTimeStampObj(curObj.dateRecorded)[0];

                            tempData.push(curObj);
                        }
                    }


                    //attempt sort of JsonArray items by Description
                    try {
                        tempData.sort(sortJsonByKey("description"));
                    }
                    catch (e) {
                        console.log("err in getConditions().dataSort:\t" + e);
                    }

                    console.log("conditions filter:\t" + data.length + ">>\t" + tempData.length);
                    pObj.conditions = tempData;

                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };


    let getImmunizations = () => {
        return new Promise((resolve, reject) => {
            console.log("\r\ngetting patient immunizations");

            //set empty object, JIC
            pObj.immunizations = [];

            immunizations.get(pID)
                .then((resp) => {
                    let data = resp.immunizations;
                    let tempData = [], descs = [];

                    for (let x = 0; x < data.length - 1; x++) {
                        let curObj = data[x];

                        //get only the shots in completed status
                        if (curObj.status == "completed") {

                            //keep the first item & non-duplicates
                            if (tempData.length === 0 || !descs.includes(curObj.description)) {
                                descs.push(curObj.description);

                                //make friendly date for display
                                curObj.dateRecorded = getDateTimeStampObj(curObj.dateRecorded)[0];

                                tempData.push(curObj);
                            }
                        }
                    }


                    //attempt sort of JsonArray items by Description
                    try {
                        tempData.sort(sortJsonByKey("description"));
                    }
                    catch (e) {
                        console.log("err in getImmunizations().dataSort:\t" + e);
                    }


                    console.log("immunizations filter:\t" + data.length + ">>\t" + tempData.length);
                    //add filtered immunizations object to global patient object
                    pObj.immunizations = tempData;

                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };


    let getMedications = () => {
        return new Promise((resolve, reject) => {
            console.log("\r\ngetting patient medications");

            //set empty object, JIC
            pObj.medications = [];

            medications.get(pID)
                .then((data) => {
                    let meds = data.medications;
                    let tempData = [], descs = [];

                    for (let x = 0; x < (meds.length - 1); x++) {
                        //get data from main object
                        let curObj = meds[x];

                        if (x === 0) {
                            descs.push(curObj.description);
                            tempData.push(curObj);
                        }
                        else {
                            if (!descs.includes(curObj.description)) {
                                descs.push(curObj.description);
                                tempData.push(curObj);
                            }
                        }
                    }

                    //attempt sort of JsonArray items by Description
                    try {
                        tempData.sort(sortJsonByKey("description"));
                    }
                    catch (e) {
                        console.log("err in getMedications().dataSort:\t" + e);
                    }


                    console.log("medications filter:\t" + meds.length + ">>\t" + tempData.length);
                    pObj.medications = tempData;

                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };


    let getPatientInfo = () => {
        return new Promise((resolve, reject) => {
            console.log("getting patient info: " + pID);

            //set empty object, JIC
            pObj.info = {};

            patientInfo.get(pID)
                .then((data) => {
                    var nameObj = data.name;

                    //place two major data points in root of patient object
                    pObj.name = nameObj[0].text;
                    pObj.patientId = data.patientId;

                    //nest other data into object
                    pObj.info = data;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };


    let getProcedures = () => {
        return new Promise((resolve, reject) => {
            console.log("\r\ngetting patient procedures");

            procedures.get(pID)
                .then((data) => {
                    //not much data HERE for the two patients...
                    //so checking for data.total
                    //I should check on ALL other data, but I know I have data THERE
                    if (data.total > 0) {
                        pObj.procedures = data.procedures;
                    }
                    else {
                        pObj.procedures = [];
                    }

                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };




    let getSensorReadings = () => {
        console.log("\r\ngetting patient sensor readings");

        pObj.sensorData = {};
        return Promise.series([getBloodPressureData, getBloodGlucoseData, getWeightScaleData]);
    };


    let getBloodPressureData = () => {
        return new Promise((resolve, reject) => {

            pObj.sensorData.bloodPressure = [];

            sensorReadings.get("bp")
                .then((data) => {

                    //attempt sort of JsonArray items by Time Stamp
                    try {
                        data.sort(sortJsonByKey("time_stamp"));
                    }
                    catch (e) {
                        console.log("err in getBloodPressureData().dataSort:\t" + e);
                    }


                    pObj.sensorData.bloodPressure = data;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };



    let getBloodGlucoseData = () => {
        return new Promise((resolve, reject) => {

            pObj.sensorData.bloodGlucose = [];

            sensorReadings.get("glucose")
                .then((data) => {

                    //attempt sort of JsonArray items by Time Stamp
                    try {
                        data.sort(sortJsonByKey("time_stamp"));
                    }
                    catch (e) {
                        console.log("err in getBloodGlucoseData().dataSort:\t" + e);
                    }

                    pObj.sensorData.bloodGlucose = data;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };



    let getWeightScaleData = () => {
        return new Promise((resolve, reject) => {

            pObj.sensorData.weight = [];

            sensorReadings.get("weight")
                .then((data) => {

                    //attempt sort of JsonArray items by Time Stamp
                    try {
                        data.sort(sortJsonByKey("time_stamp"));
                    }
                    catch (e) {
                        console.log("err in getWeightScaleData().dataSort:\t" + e);
                    }

                    let dataOut = [];
                    data.forEach(curObj => {
                        let newWeight = convertToPounds(curObj.Weight);
                        curObj.Weight = Math.floor(newWeight);
                        dataOut.push(curObj);
                    });

                    pObj.sensorData.weight = dataOut;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };





    /// PUBLIC GET METHODS

    self.allergies = function () {
        return getAllergies();
    };

    self.conditions = function () {
        return getConditions();
    };

    self.immunizations = function () {
        return getImmunizations();
    };

    self.medications = function () {
        return getMedications();
    };

    self.patient_info = function () {
        return getPatientInfo();
    };

    self.procedures = function () {
        return getProcedures();
    };

    self.sensorData = function () {
        return getSensorReadings();
    };

};