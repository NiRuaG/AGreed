const { parseString } = require('xml2js');

require('fs').readFile('./userdata.xml', function (err, data) {
    parseString(data, function (err, result) {
        console.dir(result);
    });
});