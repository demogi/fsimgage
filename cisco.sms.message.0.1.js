/**
 * Created by regandediana on 2017-04-09.
 */


var sparkMethods = require('./cisco.spark.methods.0.1');


var exports = module.exports = {};
var smsService = exports;

var util = require('util');
var EventEmitter = require('events').EventEmitter;


smsService.sendSms = sendSms;
function sendSms(number, message) {

    var url = buildSMSUrl(number, message);
    getRequest(url);
}

function buildSMSUrl(number, message) {

    return "https://api.tropo.com/1.0/sessions?action=create&token=764862594a68755278474a644a6341434341655a5566504a784d78464f4576557261504966564149644e4b44&numbertodial=" + number + "&msg=" + encodeURIComponent(message);

}

smsService.getRequest = getRequest;
function getRequest(url) {

    var emit = new sparkMethods.getRequest("get_request_tropo", url, null);

    emit.on('data', function(key, body, object) {
        console.log(key);
        console.log(body);
    });
}

util.inherits(exports.getRequest, EventEmitter);
