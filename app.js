
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
//var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var db;

var index = require('./routes/index');
// Example route  
// var user = require('./routes/user');
var reflect = require('./routes/reflect');
var progress = require('./routes/progress');  
var affirmations = require('./routes/affirmations');
var checkin = require('./routes/checkin');
var selectReflect = require('./routes/selectReflect');
var evaluateReflect = require('./routes/evaluateReflect');
var stepsReflect = require('./routes/stepsReflect');
var affirmationEdit = require('./routes/affirmationedit');
var welcome = require('./routes/welcome');

var app = express();
//app.use(bodyParser.json);

var fs = require('fs');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));  
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
// Example route
// app.get('/users', user.list);
app.get('/reflect', reflect.viewReflect);
//app.get('/progress', progress.viewProgress);
app.get('/affirmations', affirmations.viewAffirmations);
app.get('/checkin/:step/:idx', checkin.viewCheckin);
app.get('/selectReflect', selectReflect.viewSelectReflect);
app.get('/evaluateReflect', evaluateReflect.viewEvaluateReflect);
app.get('/stepsReflect', stepsReflect.viewStepsReflect);
app.get('/affirmationEdit', affirmationEdit.viewEditAffirmations);
app.get('/welcome', welcome.viewWelcome);
app.get('/progress', function(req, res) {
  db.collection("stepsData").findOne({}, function(err, result) {
    if(err) throw err;
    //console.log(result['topic']);
    //console.log(result['progress']);

    res.render('progress', {
      "topic": result['topic'],
      "progress_data":result['progress'],
      helpers: {
        ifEquals: function(arg) {
          if( arg == "true") {
          return true;
          }
          return false;
        }
      }
    });
  });
});

app.post('/progress/setSteps', function(req, res) {
  //console.log(req.body);
  db.collection("stepsData").remove({});
  //db.collection("stepsData").drop(function(err, delOk) {
  //  if(err) throw err;
  //  if(delOk) console.log("Collection deleted");
  //});
  //db.createCollection("stepsData", function(err, res) {
  //  if(err) throw err;
  //  console.log("collection created");
  //});
  db.collection("stepsData").insertOne(req.body, function(err, res) {
    if(err) throw err;
    console.log("item added to collection");
  })
  

});

app.post('/progress/updateFeel', function(req, res) {
  //console.log(req.body);
  //console.log(req.body.step);
  //console.log(req.body.feelData);
  //console.log(req.body.stepNum);
  var str = "progress." + req.body.stepNum + ".feelingData";  

  var updateVal = {};
  updateVal[str] = req.body.feelData;
  console.log(updateVal);
  db.collection("stepsData").update(
    {},
    {
      $set:
      
        updateVal
        //"progress.0.feelingData": req.body.feelData
    })

});


//app.post('/sendSteps', function(req, res) {
//  console.log(req.body);
//  fs.writeFileSync('testJson.json', JSON.stringify(req.body), 'utf8', callback);
//});

var callback = function() {
  console.log("callback");
}


var uri = "mongodb://heroku_n87z1z2v:p2vcn0hj1n0pd7u35naet61hlq@ds243798.mlab.com:43798/heroku_n87z1z2v";

mongodb.MongoClient.connect(uri, function(err, database) {
  if(err) {
    console.log(err);
    process.exit(1);
  }
  //https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function
  db = database.db('heroku_n87z1z2v');
  console.log("Database connected");


  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

});




//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
