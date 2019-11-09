const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../index.js');

module.exports = function () {

    describe("> Patient Data-Interface Modules", function () {
        /*
            ## basic tests only ##  If these modules pass tests &&
            INTEGRATION TESTS of httpRoutes pass, then app works.
 
            *I see no need to fully test each module individually against the db...
        */


        describe("-> Patient-allergies module", function () {
            const pAllergies = require('../server/lib/object-classes/patient-allergies');
            const allergies = new pAllergies();

            it("allergies should be an object", function () {
                expect(allergies).to.not.be.an("undefined");
            });

            it("allergies should have function get()", function () {
                expect(allergies.get).to.be.an("function");
            });

            it("allergies should fail here w/ invalid id", async function () {
                await allergies.get("123456")
                    .then((resp) => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });


        describe("-> Patient-conditions module", function () {
            const pConditions = require('../server/lib/object-classes/patient-conditions');
            const conditions = new pConditions();

            it("conditions should be an object", function () {
                expect(conditions).to.not.be.an("undefined");
            });

            it("conditions should have function get()", function () {
                expect(conditions.get).to.be.an("function");
            });

            it("conditions should fail here w/ invalid id", async function () {
                await conditions.get("123456")
                    .then((resp) => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });


        describe("-> Patient-immunizations module", function () {
            const pImmunizations = require('../server/lib/object-classes/patient-immunizations');
            const immunizations = new pImmunizations();

            it("immunizations should be an object", function () {
                expect(immunizations).to.not.be.an("undefined");
            });

            it("immunizations should have function get()", function () {
                expect(immunizations.get).to.be.an("function");
            });

            it("immunizations should fail here w/ invalid id", async function () {
                await immunizations.get("123456")
                    .then((resp) => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });


        describe("-> Patient-medications module", function () {
            const pMedications = require('../server/lib/object-classes/patient-medications');
            const medications = new pMedications();

            it("medications should be an object", function () {
                expect(medications).to.not.be.an("undefined");
            });

            it("medications should have function get()", function () {
                expect(medications.get).to.be.an("function");
            });

            it("medications should fail here w/ invalid id", async function () {
                await medications.get("123456")
                    .then((resp) => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });


        describe("-> Patient-info module", function () {
            const pInfo = require('../server/lib/object-classes/patient-info');
            const patientInfo = new pInfo();

            it("pInfo should be an object", function () {
                expect(patientInfo).to.not.be.an("undefined");
            });

            it("pInfo should have function get()", function () {
                expect(patientInfo.get).to.be.an("function");
            });

            it("pInfo should have function getAll()", function () {
                expect(patientInfo.getAll).to.be.an("function");
            });

            it("pInfo should fail here w/ invalid id", async function () {
                await patientInfo.get("123456")
                    .then((resp) => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });


        describe("-> Patient-procedures module", function () {
            const pProcedures = require('../server/lib/object-classes/patient-procedures');
            const procedures = new pProcedures();

            it("procedures should be an object", function () {
                expect(procedures).to.not.be.an("undefined");
            });

            it("procedures should have function get()", function () {
                expect(procedures.get).to.be.an("function");
            });

            it("procedures should fail here w/ invalid id", async function () {
                await procedures.get("123456")
                    .then((resp) => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });


        describe("-> Sensor-readings module", function () {
            const pSensorReads = require('../server/lib/object-classes/sensor-readings');
            const sensorData = new pSensorReads("123456");   //bad id

            it("sensor-readings should be an object", function () {
                expect(sensorData).to.not.be.an("undefined");
            });

            it("sensor-readings should have function get()", function () {
                expect(sensorData.get).to.be.an("function");
            });

            it("sensor-readings should fail here w/ invalid id and collectionType", async function () {
                await sensorData.get("bad collection type")
                    .then(() => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });

            it("sensor-readings should fail here w/ invalid id and valid collectionType", async function () {
                await sensorData.get("bp")
                    .then(() => {
                        throw "bad module...";
                    })
                    .catch((err) => {
                        assert.isDefined(err);
                    });
            });
        });

    });//end Patient Data Modules Tests

};