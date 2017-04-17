/**
 * Created by regandediana on 2017-04-09.
 */

// create new private room
// - create welcome message w/ file
// -- save roomId
// - create room webhook
// -- save webhookid

var sparkHelper = require('./cisco.spark.helper.0.1');
var sparkMessage = require('./cisco.spark.message.0.1');
var sparkBotMethods = require('./cisco.spark.methods.0.1');

var clientBotToken = null;
var clientPersonEmail = null;
var clientWebhookTargetUrl = null;
var messageClientWelcomeFile = null;
var messageClientWelcomeMessage = null;

var DIRECT_CLIENT_WELCOME_MESSAGE_KEY = "direct_client_welcome_message";
var CREATE_CLIENT_WEBHOOK = "create_client_webhook";

var exports = module.exports = {};
var appScript = exports;

appScript.execute = execute;

//execute();
function execute(){

    initializeVariables();
    createDirectMessage(clientBotToken, DIRECT_CLIENT_WELCOME_MESSAGE_KEY, messageClientWelcomeMessage, clientPersonEmail, messageClientWelcomeFile);

}

function initializeVariables() {

    clientPersonEmail = "rdediana@cisco.com";

    clientBotToken = "MDM5NDA4MzQtODhjMC00ZWUyLTk5ZDQtN2U2ZjRmNTliYzFiYWZhYWM4M2ItOTNh";

    clientWebhookTargetUrl = "fsi-services-01.ioetoronto.ca:8080/fsi/room/spark";

    messageClientWelcomeMessage = "hello from fsi room assistant";

    messageClientWelcomeFile = "https://storage.googleapis.com/wzukusers/user-23959368/images/57ed4714982b9es17a44/bot_d600.png";

}
function createDirectMessage(token, key, message, toPersonEmail, files) {

    json = sparkHelper.createMessageJson(null, message, null, toPersonEmail , null, files);
    var emiter = new sparkBotMethods.createMessage(token, key , json, null);

    emiter.on('data', function(key, body, object) {
        console.log("-----------");
        console.log(object);
        console.log("-----------");
        handleScriptEvents(key, body, object);
    });
    console.log(json);
}

function createWebhook(roomId, object, targetUrl) {

    json = sparkHelper.createWebhookJson("FSI Room Webhook", "messages", "created", roomId, targetUrl ) ;
    var emiter = new sparkBotMethods.createWebhook(clientBotToken, CREATE_CLIENT_WEBHOOK, json,object);

    emiter.on('data', function(key, body) {

        handleScriptEvents(key, body, object);

    });
    console.log(json);
}

function handleScriptEvents(key, body, object) {

    var jsonStr = JSON.stringify(body);
    var jsonResponse = JSON.parse(jsonStr);

    var roomId = "";
    var roomType = "";
    var roomWebUrl = "";

    if (key === DIRECT_CLIENT_WELCOME_MESSAGE_KEY) {

        roomId = jsonResponse['roomId'];
        roomType = jsonResponse['roomType'];
        roomWebUrl = sparkHelper.buildWebRoomURI(roomId);
        createWebhook(roomId, object, clientWebhookTargetUrl);

    } else if (key === CREATE_CLIENT_WEBHOOK) {

        var webhookId = jsonResponse['id'];
        var webhookFilter = jsonResponse['filter'];

        // Store items

    }
}



