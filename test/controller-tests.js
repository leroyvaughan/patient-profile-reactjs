const expect = require('chai').expect;


module.exports = function () {

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

};