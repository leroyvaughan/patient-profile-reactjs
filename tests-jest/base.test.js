const patientCtrl = require('../server/controllers/patient-ctrl');



describe("controller tests", function () {

    it("patient controller should exist", function () {
        expect(patientCtrl).toBeDefined();
    });

    it("patient controller should be an object", function () {
        expect(typeof patientCtrl).toBe("object");
    });

    it("getPatientById() should be a function", function () {
        expect(typeof patientCtrl.getPatientById).toBe("function");
    });

    it("getPatients() should be a function", function () {
        expect(typeof patientCtrl.getPatients).toBe("function");
    });

});