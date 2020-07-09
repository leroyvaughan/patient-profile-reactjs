
const mainModuleTests = require('./main-module-tests');
// const subModuleTests = require('./sub-module-tests');
const controllerTests = require('./controller-tests');
const integrationTests = require('./integration-tests');



describe("Test Suite -- begin:", function () {
    this.enableTimeouts(false);

    describe("MAIN MODULE TESTS", mainModuleTests.bind(this));


    // describe("SUB MODULE TESTS", subModuleTests.bind(this));

    describe("CONTROLLER TESTS", controllerTests.bind(this));


    describe("INTEGRATION TESTS", integrationTests.bind(this));

});
//npm run test-with-coverage