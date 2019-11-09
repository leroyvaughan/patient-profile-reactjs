const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('../index.js');


module.exports = function () {

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

    it("'getPatientById' http route w/ invalid id should fail", async function () {
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


};