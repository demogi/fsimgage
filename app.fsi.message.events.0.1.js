/**
 * Created by regandediana on 2017-04-09.
 */


var sparkHelper = require('./cisco.spark.helper.0.1');

var exports = module.exports = {};
var webhookMessage = exports;

var util = require('util');
var EventEmitter = require('events').EventEmitter;

webhookMessage.webhookMessageEvent = webhookMessageEvent;
function webhookMessageEvent(json, webhook, platform) {

    var token = getToken(webhook);

    if(platform === 'spark') {

        var emit = new sparkMessage.getMessageFromWebhookEvent(token, json);

        emit.on('data', function(key, body, object) {
            console.log("--------------------");
            console.log("Spark Message event");
            console.log("--------------------");
            console.log(object['messageId']);
            console.log(object['text']);
            console.log(object['personEmail']);
            console.log(webhook);

            handleMessageEvent(token, body, object, webhook);

        });
    } else if (platform === 'cmx') {

    }

}

function handleMessageEvent(token, body, object, webhook) {

    var json = JSON.parse(body);
    var personEmail = sparkHelper.personEmailFromWebhookEvent(json);

    if(webhook === "webhook_client_room") {
        // echo message back only if create by client (other than bot)
        // prevent loop
        if(personEmail != "tdwpa@sparkbot.io") {
            // create message to person

            // hand off message to ibm nlp

            // state (interaction ? ) check state?
            // console.log(object['messageId']);
            // console.log(object['text']);
            // console.log(object['personEmail']);

            var responseObject = null;

            responseObject = scriptService.handleClientMessage('script_tdw_kyc',  object['text']);

            if (responseObject != null) {
                var botSayObject = responseObject['botsay'];
                if (botSayObject != null) {
                    createDirectMessage(token, "client_direct_message", personEmail, botSayObject['text'], null );
                }

            }

            responseObject = scriptService.handleClientMessage('script_tdw_scheduling',  object['text']);

            if (responseObject != null) {
                var botSayObject = responseObject['botsay'];
                if (botSayObject != null) {
                    createDirectMessage(token, "client_direct_message", personEmail, botSayObject['text'], null );
                }

            }
            // // do something when script first comppletes
            // if(responseObject['script_name']=== 'script_tdw_kyc'){
            //     if (responseObject['script_action'] === true && responseObject['script_state'] === 'complete'){
            //         // do action
            //         // send personality insights to advisor
            //         // "http://localhost:8082/triggers/scripts/tdw/spark?action=create_advisor_personality_insights_message
            //         // flip script_action to false
            //
            //     }
            // }


            // createDirectMessage(token, "client_direct_message", personEmail, 'echo: ' + object['text'], null );


        }
    } else if(webhook === "webhook_advisor_room") {

        if(personEmail != "fsiroom@sparkbot.io") {

            var isIntersting = appScriptSparkMessageHandler.isInterestingMessage(object['text']);

            if (isIntersting === true){

                // Event Emitter not firing - need to troubleshoot**
                // ---------------------------------------
                // var sparkMessage = new appScriptSparkMessageHandler.processInterestingMessage(object['text']);
                // console.log(EventEmitter.listenerCount(sparkMessage, 'event'));
                // sparkMessage.on('data', function(msg) {
                //     console.log(object);
                //     createDirectMessage(token, "advisor_direct_message", personEmail, msg, null );
                // });
                // ---------------------------------------

                var responseObject = appScriptSparkMessageHandler.processSynchronousInterestingMessage(object['text'], object);

                if (responseObject != null){

                    if (responseObject['toPersonEmail'] === null) {

                        responseObject['toPersonEmail'] = personEmail;
                    }

                    if(responseObject['token'] === null) {
                        responseObject['token'] = token;
                    }

                    createDirectMessage(responseObject['token'], "advisor_direct_message", responseObject['toPersonEmail'], responseObject['text'], responseObject['image'] );


                    // using advisor bot
//                        createDirectMessage(token, "advisor_direct_message", responseObject['toPersonEmail'], responseObject['text'], responseObject['image'] );



                } else {
                    console.log('app.script.webhook.message.event[handleMessageEvent]: No Response');
                }

            } else  {

            }
        }

    } else if(webhook === "webhook_curation_room") {
        if(personEmail != "tdwca@sparkbot.io") {
            // create message to person
            createDirectMessage(token, "curation_direct_message", personEmail, "hello", null );
        }
    }

}

function createDirectMessage(token, key, toPersonEmail, text, file) {

    json = sparkHelper.createMessageJson(null, text, null, toPersonEmail , null, file);
    var emiter = new sparkMethods.createMessage(token, key, json, null);

    emiter.on('data', function(key, body, object) {
        console.log(EventEmitter.listenerCount(emiter, 'event'));
        console.log(object);

    });
    console.log(json);
}


function getToken(webhook) {
    var token = null;
    if(webhook === "fsi_room_spark") {
        token = "MDM5NDA4MzQtODhjMC00ZWUyLTk5ZDQtN2U2ZjRmNTliYzFiYWZhYWM4M2ItOTNh";
    } else if(webhook === "fsi_room_cmx") {
        token = "<token>";
    }

    return token;
}

util.inherits(exports.webhookMessageEvent, EventEmitter);

