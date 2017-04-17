/**
 * Created by regandediana on 2017-04-09.
 */

var request = require('request');
var util = require('util');
var EventEmitter = require('events').EventEmitter;



function Request(key, url, method, headers, data) {

    var self = this;

    self.emit('start', url);

    request({
        url: url,
        method: method,
        headers: headers,
        json: data

    }, function (error, resp, body) {

        console.log(body);

        self.emit('data', key, resp, body, null);

    });
}

util.inherits(Request, EventEmitter);
module.exports = Request;

