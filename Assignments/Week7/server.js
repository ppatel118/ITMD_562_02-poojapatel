var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://pooja.patel1808@gmail.com:Jaijalaram#18@ds115085.mlab.com:15085/ppatel118";


//Connects
MongoClient.connect(url, function(err, db) {
    
  if (err) throw err;
  console.log("Database created!");
  
 
 //Get acceptiong id
app.get('/hands/:handId', function (req, res) {
    var handId =  parseInt(req.params.handId);
    var query = {_id: handId};
     db.collection("hands").find(query).toArray(function(err, result) {
      if (err) throw err;
       if(result.length <= 0 || result == undefined || result == null){
          res.status(404).send({status:"404-Not Found"});
       }else{
          res.status(200).send(result[0].cards);
       }
    });
});

//Get cards
app.get('/hands/:handId/cards', function (req, res) {
     var handId =  parseInt(req.params.handId);
     var query = {_id: handId};
     db.collection("hands").find(query).toArray(function(err, result) {
      if (err) throw err;
      if(result.length <= 0 || result == undefined || result == null){
          res.status(404).send({status:"404-Not Found"});
      }else{
          res.status(200).send(result[0].cards);
      }
    });
});

//Post hands
app.post('/hands', function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    
     var data = request.body; 
     console.log(data);
     if(isArray(data)){
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
              var obj = {_id:count,cards:data};
             db.collection("hands").insertOne(obj, function(err, res) {
               if (err) throw err;
               console.log({id:res.insertedId});
               response.status(200).send({id:res.insertedId});
               //db.close();
             });

            });
   
     }else{
          response.status(204).send({status:"Please post valid jsonArray"});
     }
});

//put accepting param and data
app.put('/hands/:handId', function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    
    var handId =  parseInt(request.params.handId);
    var query = {_id:handId};
    
    var data = request.body;
    console.log("Put...");
    console.log(query);
    
     if(isArray(data)){
     
        var newvalues = {_id:handId,cards:data};
         console.log(newvalues);
         
        db.collection("hands").updateOne(query, newvalues, function(err, res) {
           if (err){
                response.status(404).send({status:"Error"});
           }else{
               if(res.result.nModified >= 1){
                    response.status(204).send({status:""}); 
               }else{
                    response.status(404).send({status:"404-Not Found"});
               }

           }

         });
  }else{
       response.status(204).send({status:"Please post valid jsonArray"});
  }
   
});

isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};

});

app.listen(port);
console.log('Listening on port: '+ port);

