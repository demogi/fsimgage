/**
 * Created by regandediana on 2017-04-09.
 */


var sparkHelper = require('./cisco.spark.helper.0.1');
var sparkMethods = require('./cisco.spark.methods.0.1');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var exports = module.exports = {};
var sparkMessage = exports;

var GET_CLIENT_MESSAGE = "get_client_message";

sparkMessage.getMessageFromWebhookEvent = getMessageFromWebhookEvent;
function getMessageFromWebhookEvent(token, json) {

    var messageId = sparkHelper.messageIdFromWebhookEvent(json);

    var object = {};
    object['messageId'] = messageId;
    object['key'] = GET_CLIENT_MESSAGE;
    object['token'] = token;

    var emiter = new sparkMethods.getMessage(token, GET_CLIENT_MESSAGE, messageId, object);

    var self  = this;
    emiter.on('data', function(key, body) {

        handleScriptEvents(key, body, object);
        object['text'] = getMessageText(body);
        object['personEmail'] = getMessagePersonEmail(body);
        object['roomId'] = getMessageRoomId(body);
        self.emit('data', key, body, object);

    });

}

function getMessageText(body) {

    var json = JSON.parse(body);
    var messageText = sparkHelper.messageTextFromMessageDetails(json);

    return messageText;
}

function getMessagePersonEmail(body) {

    var json = JSON.parse(body);
    var messagePersonEmail = sparkHelper.messagePersonEmailFromMessageDetails(json);

    return messagePersonEmail;

}
function getMessageRoomId(body) {

    var json = JSON.parse(body);
    var messageRoomId = sparkHelper.messageRoomIdFromMessageDetails(json);

    return messageRoomId;

}
function handleScriptEvents(key, body, object) {

    var self = this;
    console.log("pdp.spark.message[handleScriptEvents]:" + key);
    if (typeof body != 'undefined' && body != '') {
        console.log("pdp.spark.message[handleScriptEvents]:" + body);
        var json = JSON.parse(body);
        var messageText = sparkHelper.messageTextFromMessageDetails(json);
        console.log(messageText);
    }


    //self.emit('data', key, body, object);
    //self.emit('data')
}

util.inherits(sparkMessage.getMessageFromWebhookEvent, EventEmitter);

