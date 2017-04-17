/**
 * Created by regandediana on 2017-04-16.
 */


var exports = module.exports = {};
var cmxNotification = exports;

cmxNotification.name = name;
var name = "";
var userId = "";

var enabled = false;
var enableMacScrambling = false;
var macScramblingSalt = "";
var notificationType = "";

var rules = [];
var subscribers = [];

cmxNotification.setName = setName;
function setName(value) {
    name = value;
}

cmxNotification.setUserId = setUserId;
function setUserId(value) {
    userId = value;
}

cmxNotification.setEnabled = setEnabled;
function setEnabled(value) {
    enabled = value;
}

cmxNotification.setEnableMacScrambling = setEnableMacScrambling;
function setEnableMacScrambling(value) {
    enableMacScrambling = value;
}

cmxNotification.setMacScramblingSalt = setMacScramblingSalt;
function setMacScramblingSalt(value) {
    macScramblingSalt = value;
}

cmxNotification.setNotificationType = setNotificationType;
function setNotificationType(value) {
    notificationType = value;
}

// function Notification(name, userId, enabled, notificationType, rules, subscribers, enableMacScrambling, macScramblingSalt) {
//
//     this.name = name;
//     this.userId = userId;
//     this.enabled = enabled;
//     this.notificationType = notificationType;
//     if(rules === null) {
//         this.rules = initRules();
//     } else {
//         this.rules = rules;
//     }
//
//     if(subscribers === null) {
//         this.subscribers = initSubscribers();
//     } else {
//         this.subscribers = subscribers;
//     }
//
//     this.enableMacScrambling = enableMacScrambling;
//     this.macScamblingSalt = macScramblingSalt;
//
// }

init();
function init() {
    rules = initRules();
    subscribers = initSubscribers();
}

function initRules() {
    var initRules = [];
    initRules.push({"conditions": []});
    return initRules;
}

function initSubscribers() {
    var initSubscribers = [];
    initSubscribers.push({"receivers": []});
    return initSubscribers;
}


cmxNotification.addCondition = addCondition;
function addCondition(condition) {


    console.log(rules.length);

    var conditionDictionary = rules[0];
    conditions = conditionDictionary['conditions'];
    conditions.push({"condition": condition});

    rules[0] = {"conditions": conditions};

}
//
// "uri": "http://128.107.70.29:8000",
//     "messageFormat": "JSON",
//     "qos": "AT_MOST_ONCE"

cmxNotification.addReceiver = addReceiver;
function addReceiver(uri, messageFormat, qos) {


    console.log(subscribers.length);

    var subscriberDictionary = subscribers[0];
    receivers = subscriberDictionary["receivers"];
    receivers.push({"uri": uri, "messageFormat": messageFormat, "qos":qos});

    subscribers[0] = {"receivers": receivers};

}

cmxNotification.json = json;
function json() {

    var notificationJson = {};

    notificationJson = {"name": name,
                        "userId": userId,
                        "enabled": enabled,
                        "enableMacScrambling": enableMacScrambling,
                        "macScamblingSalt": macScramblingSalt,
                        "notificationType": notificationType,
                        "rules": rules,
                        "subscribers": subscribers};

    var jsonString = JSON.stringify(notificationJson);
    console.log(jsonString);

    return jsonString;
}

cmxNotification.dictionary = dictionary;
function dictionary() {

    var notificationDictionary = {};

    notificationDictionary = {"name": name,
        "userId": userId,
        "enabled": enabled,
        "enableMacScrambling": enableMacScrambling,
        "macScamblingSalt": macScramblingSalt,
        "notificationType": notificationType,
        "rules": rules,
        "subscribers": subscribers};

    console.log(notificationDictionary);

    return notificationDictionary;
}

// module.exports = {
//     name: name,
//     userId: userId,
//     enabled: enabled,
//     enableMacScrambling: enableMacScrambling,
//     macScramblingSalt: macScramblingSalt,
//     notificationType: notificationType,
//     rules: rules,
//     subcribers: subscribers
// };