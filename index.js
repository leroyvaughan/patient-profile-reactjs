const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const apiPort = process.env.PORT || 5000;
const globalVars = require('./server/lib/global-vars');
require('dotenv').config();

const db = require('./server/db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const patientRouter = require('./server/routes/patient-router');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());



 app.get('/', (req, res) => {
     res.redirect("/api/patient/4342012");
 })


app.use("/api", patientRouter);




/*
HELMET SECURES APP:
    - XSS Protection
    - Prevent Clickingjacking using X-Frame-Options
    - Enforcing all connections to be HTTPS
    - Setting a Context-Security-Policy header
    - Disabling the X-Powered-By header so attackers cannot narrow down their attacks to specific software
*/
var helmet = require('helmet');
app.use(helmet());



//// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

//// The "catchall" handler: for any request that doesn't
//// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + '/client/build/index.html'));
//});


// start server on the specified port, binding host
app.listen(apiPort, function () {
    console.log("server starting on " + apiPort);
});