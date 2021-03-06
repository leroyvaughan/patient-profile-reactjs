﻿
/**
 * **************************************************************
    THESE ARE NPM PACKAGES
 * **************************************************************
 */
const _guid = require('guid');
global.Guid = _guid;

global.Promise = require('bluebird');
//extend bluebird Promise for sequential batch processing
Promise.series = (promiseArr, param) => {
    return Promise.reduce(promiseArr, (values, promise) => {
        return promise(param).then((result) => {
            values.push(result);
            return values;
        });
    }, []);
};


Promise.seriesWithParam = function (arrFunc, paramArr) {
    var funcArr = [], ix = -1;

    var myCnt = paramArr.length;

    //make function call for each item in paramArr
    //ie: pID, oID
    for (var x = 0; x < paramArr.length; x++) {
        if (isNull(paramArr[x])) {
            // consoleLog("null? " + x, 3, 4);
            throw "null object in paramArr";
        }
        funcArr.push(arrFunc);
    }

    /// values = returnObj, promise = funcArr-item
    return Promise.reduce(funcArr, (values, promise) => {
        ix++;
        return promise(paramArr[ix])
            .then((result) => {
                //values.push(result);
                return "";
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
};


String.prototype.Proper = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;

    //for iHealth sensor reading note: replace('+', ' ')
    if (search.indexOf('+') >= 0) {
        return target.replace(/\+/g, replacement);
    }

    return target.replace(new RegExp(search, 'g'), replacement);
};

global.sortJsonByKey = function (prop) {
    return function (a, b) {
        var one = a[prop];
        var two = b[prop];

        //make it case-insensitive
        if (!isNull(one)) {
            if (typeof (one) == 'string')
                one = one.toLowerCase();
        }
        if (!isNull(two)) {
            if (typeof (two) == 'string')
                two = two.toLowerCase();
        }

        if (one > two) {
            return 1;
        } else if (one < two) {
            return -1;
        }
        return 0;
    }
};



/**
 * **************************************************************
    MISCELLANEOUS FUNCTIONS
 * **************************************************************
 */


global.isNull = function (inVar) {
    if (typeof inVar === 'undefined') {
        return true;
    }
    else if (typeof inVar === 'string') {
        if (inVar === '') {
            return true;
        }
    }
    else if (typeof inVar === 'object') {
        if (inVar.length === 0) {
            return true;
        }
    }
    else if (Number.isInteger(inVar)) {
        if (inVar < 1) {
            return true;
        }
    }
    else if (inVar === null) {
        return true;
    }

    return false;
};


// global.consoleLog = function (strIn, pre, post, txt) {
//     if (!isNull(pre)) {
//         for (var x = 0; x < pre; x++) {
//             console.log("");
//         }
//     }


//     if (!isNull(txt)) {
//         console.log(txt + "\r\n" + strIn);
//     }
//     else {
//         console.log(strIn);
//     }


//     if (!isNull(post)) {
//         for (var x = 0; x < post; x++) {
//             console.log("");
//         }
//     }
// };



global.convertToPounds = function (inVal) {
    try {
        var kg = parseFloat(inVal);
        var outVal = kg * 2.20462262185;
        return outVal;
    }
    catch (e) {
        console.log("error converting kg(" + inVal + ") to lbs");
    }
};





global.getRiskText = function (val) {
    var txt = '';
    switch (val) {
        case 'CRITH':
            txt = 'High Risk';
            break;
        case 'CRITL':
            txt = 'Low Risk';
            break;
        case 'CRITU':
            txt = 'Unable to Determine';
            break;
    }

    return txt;
}


global.getNow = function (dateIn) {
    var dt = (!isNull(dateIn)) ? dateIn : new Date();
    dt = JSON.stringify(dt);
    return dt.replaceAll('"', '');
};
global.makeTimeStamp = function () {
    //must be a date object
    var now = new Date(getNow());
    return now.getTime();
}
global.getTimeStamp = function (now) {
    // Create an array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

    // Create an array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    // Determine AM or PM suffix based on the hour
    var suffix = (time[0] < 12) ? "AM" : "PM";

    // Convert hour from military time
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Return the formatted string
    return [date.join("/"), time.join(":") + " " + suffix, now.getTime(), getNow(now)];
};
global.getDateTimeStampObj = function (dateIn) {
    var now = new Date();

    if (!isNull(dateIn)) {
        now = new Date(dateIn);
    }

    return getTimeStamp(now);
};