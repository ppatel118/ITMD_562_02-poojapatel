var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var port = process.env.PORT || 3000;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


MongoClient.connect(url, function(err, db) {
    
  if (err) throw err;
  console.log("Database created!");

 
app.get('/hands/:handId', function (req, res) {
    var handId =  parseInt(req.params.handId);
    var query = {_id: handId};
     db.collection("hands").find(query).toArray(function(err, result) {
      if (err) throw err;
       if(result.length <= 0 || result == undefined || result == null){
          res.status(404).send({status:"404 No found"});
       }else{
          res.status(200).send(result[0].cards);
       }
    });
});
app.get('/hands/:handId/cards', function (req, res) {
     var handId =  parseInt(req.params.handId);
     var query = {_id: handId};
     db.collection("hands").find(query).toArray(function(err, result) {
      if (err) throw err;
      if(result.length <= 0 || result == undefined || result == null){
          res.status(404).send({status:"404 No found"});
      }else{
          res.status(200).send(result[0].cards);
      }
    });
});

app.post('/test', function (request, response) {
     response.setHeader('Content-Type', 'application/json');
     var data = request.body;
     console.log(data);
});

app.post('/hands', function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    var data = request.body;
    console.log(data);
    
    var count = 0;
    
   db.collection("count").find({}).toArray(function(err, result) {
    if (err) throw err;
     if(result.length <= 0 || result == undefined || result == null){
            var countObj = {count:count};
            console.log(count)
            db.collection("count").insertOne(countObj, function(err, res) {
                if (err) throw err;
            });
     }else{
            count = result[0].count+1;
            var countObj = {count:count};
            db.collection("count").updateOne({_id:result[0]._id},countObj, function(err, res) {
                if (err) throw err;
            });
     }
     
    var obj = {_id:count,cards:[{"suits":"club","rank":"a"},{"suits":"dimaond","rank":"2"},{"suits":"club","rank":"a"},{"suits":"hearts","rank":"k"},{"suits":"spades","rank":"j"}]};
    db.collection("hands").insertOne(obj, function(err, res) {
      if (err) throw err;
      response.status(200).send({id:res.insertedId});
    });
  
   });
   
  
   
});
app.put('/hands', function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    
    var handId =  parseInt(req.params.handId);
    var query = {_id: handId};
    
    var data = request.body;
    console.log(data);
   
     var newvalues = {_id:3,cards:[{"suits":"club","rank":"a"},{"suits":"dimaond","rank":"2"},{"suits":"club","rank":"a"},{"suits":"hearts","rank":"k"},{"suits":"spades","rank":"j"}]};
     
     db.collection("hands").updateOne(query, newvalues, function(err, res) {
        if (err){
            res.status(404).send({status:"404 Not found"});
        }else{
            if(res.result.nModified >= 1){
                 res.status(204).send({status:"No content"}); 
            }else{
                res.status(404).send({status:"404 Not found"});
            }
          
        }
          
      });
   
});

});

app.listen(port);
console.log('Listening on port: '+ port);

