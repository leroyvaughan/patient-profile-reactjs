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

    describe("> patient-info module", function () {
        const pInfo = require('../server/lib/object-classes/patient-info');
        const patientInfo = new pInfo();

        it("should be an object", function () {
            expect(patientInfo).to.not.be.an("undefined");
        });

        it("should have function get()", function () {
            expect(patientInfo.get).to.be.an("function");
        });

        it("should have function getAll()", function () {
            expect(patientInfo.getAll).to.be.an("function");
        });
    });
});



describe("INTEGRATION TESTS", function () {
    this.enableTimeouts(false)

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


