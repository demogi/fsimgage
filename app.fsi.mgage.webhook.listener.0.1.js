/**
 * Created by regandediana on 2017-04-07.
 */


var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

app.use(bodyParser.json());

app.listen(port, function(err) {
    console.log('running server on port ' + port);
    if(err != null){
        console.log('List Error: ' + err.body);
    }
});

app.post('/notification', function(req, res){

    console.log(res.headers);
    console.log(req.body);

    var json = req.body;
    console.log(json);

    res.end();

});

app.post('/fsi/room/spark', function(req, res){

    console.log(res.headers);
    console.log(req.body);

    var json = req.body;
    // handleAdvisorRoomEvents(json);

    res.end();
    // res.send();

});

// edit