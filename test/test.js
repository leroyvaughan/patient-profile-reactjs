const chai = require("chai");
const chaiHttp = require('chai-http');
const counter = require('chai-counter');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should;
// const expect = require('expect.js');
const app = require('../index.js');


describe("CONTROLLER TESTS", function (done) {

    describe("> Patient Controller", function () {

        const patientCtrl = require('../server/controllers/patient-ctrl');

        it("patient controller should exist", function () {
            expect(patientCtrl).to.not.be.an("undefined");
        });

        it("patient controller should be an object", function () {
            expect(patientCtrl).to.be.an("object");
        });

        it("getPatientById() should be a function", function () {
            expect(patientCtrl.getPatientById).to.be.an("function");
        });

        it("getPatients() should be a function", function () {
            expect(patientCtrl.getPatients).to.be.an("function");
        });
    });
});




describe("MODULE TESTS", function () {

    describe("> Patient Data Modules", function () {
        this.enableTimeouts(false);
        /*
            ## basic tests only ##  If these modules pass tests &&
            INTEGRATION TESTS of httpRoutes pass, then app works.

            *I see no need to test each module individually against the db...
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


});


describe("INTEGRATION TESTS", function () {
    this.enableTimeouts(false);

    it("'getPatientById' http route, w/ valid id", async function () {
        chai.use(chaiHttp);
        try {
            const res = await chai.request(app)
                .get('/api/patient/4342012');

            expect(res).to.be.an("object");
            expect(res).to.have.status(200);
            expect(res).to.have.property("body").to.have.property("data");

            expect(res.body.data).to.have.keys(
                "allergies", "conditions", "immunizations",
                "info", "medications", "name",
                "patientId", "procedures", "sensorData");
        }
        catch (err) {
            throw err;
        }
    });

    it("'getPatientById' http route should fail", async function () {
        chai.use(chaiHttp);
        try {
            const res = await chai.request(app)
                .get('/api/patient/123456');

            expect(res).to.have.status(404);
        }
        catch (err) {
            throw err;
        }
    });


    it("'get all patients' http route", async function () {
        chai.use(chaiHttp);
        try {
            const res = await chai.request(app)
                .get('/api/patients');

            expect(res).to.be.an("object");
            expect(res).to.have.status(200);
            expect(res).to.have.property("body").to.have.property("data");
            expect(res.body.data).to.be.an("array");
            expect(res.body.data).to.not.be.empty;
        }
        catch (err) {
            throw err;
        }
    });


});


