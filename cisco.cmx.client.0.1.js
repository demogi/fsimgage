/**
 * Created by regandediana on 2017-04-14.
 */

var request = require('request');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var exports = module.exports = {};
var cmxClient = exports;
util.inherits(Request, EventEmitter);

function toBase64(username, password){

    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    console.log("----------------------------------");
    console.log("Authentication string: "+ username+":"+password);
    console.log("Base64 encoded auth string: " + auth);
    console.log("----------------------------------");
    return auth;

}

cmxClient.Request = Request;
function Request(key, url, method, username, password) {

    var self = this;

    var token = toBase64("learning", "learning");

    var headers = {
        "authorization": token
    };

    self.emit('start', url);

    request(
        {
            url : url,
            headers : headers
        },

        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self.emit('data', key, response, body, null);
            } else if (error) {
                console.log('Error: ' + error);
            }
        }
    );

    self.emit('stop', url);
}

cmxClient.getRequest = getRequest;
function getRequest(key, url, method, username, password) {

    var self = this;

    var token = toBase64("learning", "learning");

    var headers = {
        "authorization": token
    };

    self.emit('start', url);

    request(
        {
            url : url,
            headers : headers
        },

        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self.emit('data', key, response, body, null);
            } else if (error) {
                console.log('Error: ' + error);
            }
        }
    );

    self.emit('stop', url);
}

cmxClient.getRequest = getRequest;
function postRequest(key, url, method, username, password, data) {

    var self = this;

    var token = toBase64("learning", "learning");

    var headers = {
        "authorization": token
    };

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

