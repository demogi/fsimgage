/**
 * Created by regandediana on 2017-04-09.
 */

var fs = require('fs');
var atob = require('atob');

var exports = module.exports = {};
var sparkHelper = exports;

sparkHelper.createRoomJson = createRoomJson;
function createRoomJson(title){

    var roomJsonData = {
        "title" : title
    };
    return roomJsonData;
}

sparkHelper.createWebhookJson = createWebhookJson;
function createWebhookJson(name, resource, event, roomId, targetUrl){

    var webhookJsonData = {
        "name" : name,
        "resource" : resource,
        "event" : event,
        "filter" : "roomId=" + roomId,
        "targetUrl" : targetUrl

    };

    return webhookJsonData;

}

sparkHelper.createMembershipJson = createMembershipJson;
function createMembershipJson(roomId, personEmail){

    var membershipJsonData = {
        "roomId" : roomId,
        "personEmail" : personEmail
    };
    // psersonId: id
    return membershipJsonData;

}

sparkHelper.createMessageJson = createMessageJson;
function createMessageJson(roomId, text, toPersonId, toPersonEmail, markdown, files){

    var messageJsonData = {};


    if (roomId != null) {
        messageJsonData["roomId"] = roomId;
    }


    if (text != null) {
        messageJsonData["markdown"] = text;
    }


    if (toPersonId != null) {
        messageJsonData["toPersonId"] = toPersonId;
    }


    if (toPersonEmail != null) {
        messageJsonData["toPersonEmail"] = toPersonEmail;
    }

    if (markdown != null) {
        messageJsonData["markdown"] = markdown;
    }

    if (files != null) {
        messageJsonData["files"] = files;
    }

    //messageJsonData["markdown"] = true;
    return messageJsonData;

}


sparkHelper.messageIdFromWebhookEvent = messageIdFromWebhookEvent;
function messageIdFromWebhookEvent(json){

    // need some checks to vaidate this is valid JSON object for webhool message created event

    // expect validated json object and data
    var data = json["data"];
    var messageId = data["id"];

    return messageId;
}

sparkHelper.personEmailFromWebhookEvent = personEmailFromWebhookEvent;
function personEmailFromWebhookEvent(json){

    // need some checks to vaidate this is valid JSON object for webhool message created event

    // expect validated json object and data
    var data = json["data"];
    var personEmail = json["personEmail"];

    return personEmail;
}

sparkHelper.roomIdFromWebhookEvent = roomIdFromWebhookEvent;
function roomIdFromWebhookEvent(json){

    // need some checks to vaidate this is valid JSON object for webhool message created event

    // expect validated json object and data
    var data = json["data"];
    var roomId = json["roomId"];

    return roomId;
}


sparkHelper.messageTextFromMessageDetails = messageTextFromMessageDetails;
function messageTextFromMessageDetails(json){

    // need some checks to vaidate this is valid JSON object for message details

    // expect validated json object and data
    var messageText = json["text"];

    return messageText;
}

sparkHelper.messagePersonEmailFromMessageDetails = messagePersonEmailFromMessageDetails;
function messagePersonEmailFromMessageDetails(json){

    // need some checks to vaidate this is valid JSON object for message details

    // expect validated json object and data
    var messagePersonEmail = json["personEmail"];

    return messagePersonEmail;
}


sparkHelper.messageRoomIdFromMessageDetails = messageRoomIdFromMessageDetails;
function messageRoomIdFromMessageDetails(json){

    // need some checks to vaidate this is valid JSON object for message details

    // expect validated json object and data
    var messageRoomId = json["roomId"];

    return messageRoomId;
}



sparkHelper.readJsonFile = readJsonFile;
function readJsonFile(name) {

    var json = null;
    var fileConentString = null;


    fileConentString = fs.readFileSync(name).toString();


    if (fileConentString) {
        json = JSON.parse(fileConentString);
    }

    console.log(json);
    return json;

}

sparkHelper.buildWebRoomURI = buildWebRoomURI;
function buildWebRoomURI(roomId) {
    var baseUrl = "https://web.ciscospark.com/#/rooms/";
    var decodeVal = base64Decode(roomId);
    //ciscospark://us/ROOM/210ba450-8adf-11e6-a6c6-61e10bdf8b1b
    var spl = decodeVal.split("/");
    var webRoomId = spl[spl.length - 1];
    var retval = baseUrl + webRoomId;
    return retval;
}
function base64Decode(value) {
    var retval = atob(value);
    return retval;
}