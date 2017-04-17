/**
 * Created by regandediana on 2017-04-09.
 */

/**
 * Created by regandediana on 2016-09-30.
 */
var sparkRequest = require('./cisco.spark.client.0.1');

var exports = module.exports = {};
var sparkMethods = exports;

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var CONST_SPARK_API_URL = 'https://api.ciscospark.com/v1/';

sparkMethods.createSparkRoom = createSparkRoom;
function createSparkRoom(token, key, jsonData, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "rooms";

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'POST', headers, jsonData);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}

sparkMethods.removeRoom = removeRoom;
function removeRoom(token, key, id, object){

    //     https://api.ciscospark.com/v1/webhooks
    var self = this;

    var url = CONST_SPARK_API_URL + "rooms" + "/" + id;

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'DELETE', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}

sparkMethods.createRoomMembership = createRoomMembership;
function createRoomMembership(token, key, jsonData, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "memberships";

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };


    var r = new sparkRequest(key, url, 'POST', headers, jsonData);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}

sparkMethods.removeMemberships = removeMemberships;
function removeMemberships(token, key, roomId, object){


    var emiter = new getMemberships(token, key, roomId, object);
    var jsonObject = null;

    emiter.on('data', function(key, body, object) {

        console.log(object);
        jsonObject = JSON.parse(body);
        console.log(jsonObject);

        var membershipItems = jsonObject['items'];
        // if filter null, remvoe all

        processRemoveMemberships(token, key, membershipItems, object);

    });

}

function processRemoveMemberships(token, key, membershipItems, object) {
    if(membershipItems != null) {
        for (var x = 0; x < membershipItems.length; x++) {

            console.log("pdp.spark.methods[removeMembership]items");
            console.log(membershipItems[x]);
            var membership = membershipItems[x];
            var membershipId = membership['id'];
            var emit = new removeMembership(token, key, membershipId, object);

            // emit.on('data', function(key, body, object) {
            //
            // });
        }
    } else {
        console.log('pdp.spark.methods[processRemoveMemberships]membershipItems: is null');
    }

}


sparkMethods.getMemberships = getMemberships;
function getMemberships(token, key, roomId, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "memberships?roomId=" + roomId;

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'GET', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}


sparkMethods.removeMembership = removeMembership;
function removeMembership(token, key, id, object){

    //     https://api.ciscospark.com/v1/webhooks
    var self = this;

    var url = CONST_SPARK_API_URL + "memberships" + "/" + id;

    var headers = {
        "content-type": "application/json; charset=utf-8",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'DELETE', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}

// two changing elements
// - url (path)
// - sparkRequest Key
// build method to handle these changes
// improve code reusability

sparkMethods.createWebhook = createWebhook;
function createWebhook(token, key, jsonData, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "webhooks";

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'POST', headers, jsonData);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}


sparkMethods.createMessage = createMessage;
function createMessage(token, key, jsonData, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "messages";

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };

    if (object === null) {
        var object = {};
        object['key'] = key;
        object['json'] = jsonData;
        object['url'] = url;
    }



    var r = new sparkRequest(key, url, 'POST', headers, jsonData);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}

sparkMethods.getMessage = getMessage;
function getMessage(token, key, messageId, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "messages" + "/" + messageId;

    var headers = {
        "content-type": "application/json",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'GET', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}



sparkMethods.getRequest = getRequest;
function getRequest(key, url, object){

    var self = this;

    var headers = {
        "content-type": "application/json",
    };

    var r = new sparkRequest(key, url, 'GET', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}



sparkMethods.getMessages = getMessages;
function getMessages(token, key, roomId, object){

    var self = this;

    var url = CONST_SPARK_API_URL + "messages?roomId=" + roomId;

    var headers = {
        "content-type": "application/json; charset=utf-8",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'GET', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}

sparkMethods.removeMessages = removeMessages;
function removeMessages(token, key, roomId, object){


    var emiter = new getMessages(token, key, roomId, object);
    var jsonObject = null;

    emiter.on('data', function(key, body, object) {

        console.log(object);
        jsonObject = JSON.parse(body);
        console.log(jsonObject);

        var messageItems = jsonObject['items'];
        // if filter null, remvoe all
        processRemoveMessages(token, key, messageItems, object);

    });

}

function processRemoveMessages(token, key, messageItems, object) {
    for (var x = 0; x < messageItems.length; x++) {

        console.log("pdp.spark.methods[removeMessages]items");
        console.log(messageItems[x]);
        var message = messageItems[x];
        var messageId = message['id'];
        var emit = new removeMessage(token, key, messageId, object);

        // emit.on('data', function(key, body, object) {
        //
        // });
    }
}
sparkMethods.removeMessage = removeMessage;
function removeMessage(token, key, id, object){

    //     https://api.ciscospark.com/v1/webhooks
    var self = this;

    var url = CONST_SPARK_API_URL + "messages" + "/" + id;

    var headers = {
        "content-type": "application/json; charset=utf-8",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'DELETE', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}


sparkMethods.getWebhooks = getWebhooks;
function getWebhooks(token, key, object){

    //     https://api.ciscospark.com/v1/webhooks
    var self = this;

    var url = CONST_SPARK_API_URL + "webhooks";

    var headers = {
        "content-type": "application/json; charset=utf-8",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'GET', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}
sparkMethods.removeWebhooks = removeWebhooks;
function removeWebhooks(token, key, filter, object){


    var emiter = new getWebhooks(token, key, object);
    var jsonObject = null;

    emiter.on('data', function(key, body, object) {

        console.log(object);
        jsonObject = JSON.parse(body);
        console.log(jsonObject);

        var webhookItems = jsonObject['items'];
        // if filter null, remvoe all
        processRemoveWebhooks(token, key, webhookItems, object);

    });

}

function processRemoveWebhooks(token, key, webhookItems, object) {
    for (var x = 0; x < webhookItems.length; x++) {

        console.log("pdp.spark.methods[removeWebhooks]items");
        console.log(webhookItems[x]);
        var webhook = webhookItems[x];
        var webhookId = webhook['id'];
        var emit = new removeWebhook(token, key, webhookId, object);

        // emit.on('data', function(key, body, object) {
        //
        // });
    }
}
sparkMethods.removeWebhook = removeWebhook;
function removeWebhook(token, key, id, object){

    //     https://api.ciscospark.com/v1/webhooks
    var self = this;

    var url = CONST_SPARK_API_URL + "webhooks" + "/" + id;

    var headers = {
        "content-type": "application/json; charset=utf-8",
        "authorization": "Bearer " + token
    };

    var r = new sparkRequest(key, url, 'DELETE', headers, null);

    r.on('start', function () {
        console.log("I've Started!");
    });
    r.on('data', function (key, resp, body) {
        self.emit('data', key, body, object);
    });
    r.on('end', function (t) {
        console.log("I'm done, with " + t + " data events.");
    });

}


util.inherits(exports.createSparkRoom, EventEmitter);
util.inherits(exports.removeRoom, EventEmitter);
util.inherits(exports.createRoomMembership, EventEmitter);
util.inherits(exports.createWebhook, EventEmitter);
util.inherits(exports.createMessage, EventEmitter);
util.inherits(exports.getMessage, EventEmitter);
util.inherits(exports.getRequest, EventEmitter);
util.inherits(exports.removeWebhooks, EventEmitter);
util.inherits(exports.getWebhooks, EventEmitter);
util.inherits(exports.removeWebhook, EventEmitter);
util.inherits(exports.getMessages, EventEmitter);
util.inherits(exports.removeMessages, EventEmitter);
util.inherits(exports.removeMessage, EventEmitter);
util.inherits(exports.removeMembership, EventEmitter);
util.inherits(exports.removeMemberships, EventEmitter);
util.inherits(exports.getMemberships, EventEmitter);
// module.exports.token = token;
module.exports.CONST_SPARK_API_URL = CONST_SPARK_API_URL;
