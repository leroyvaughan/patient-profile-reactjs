const mongoose = require('mongoose');

//won't work in mocha test environment!
//must add collection name (singular) as third param in models...
mongoose.pluralize(null);


mongoose
    .connect(process.env.DB_STRING, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;