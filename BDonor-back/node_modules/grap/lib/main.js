#!/usr/bin/env node

module.exports = function(options) {

    var filename = options.file;
    var dateOffset = options.dateOffset || 0;
    var dateFormat = options.dateFormat || 'MMM DD HH:mm:ss.SSS Z';

    var fs = require('fs'),
        util = require('util'),
        readline = require('readline'),
        moment = require('moment'); 
        
    var rd = readline.createInterface({
        input: filename != null ? fs.createReadStream(filename) : process.stdin,
        output: process.stdout,
        terminal: false
    });

    function parseMoment(line) {
        var dateStr = line.substr(dateOffset, dateFormat.length);
        return moment(dateStr, dateFormat);
    }

    var lastStamp = 0;

    rd.on('line', function(line) {
        var thisMoment = parseMoment(line);
        if(thisMoment.isValid()) {
            var thisStamp = thisMoment.toDate().getTime();
            if(thisStamp < lastStamp) {
                console.log(line);
            }
            else {
                lastStamp = thisStamp;
            }                    
        }
    });

}

