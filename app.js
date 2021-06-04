const express = require('express');

const app =express();

const dotenv = require('dotenv');
const cors = require('cors');

const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
const connection = require('./dbService');


app.use(express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/script', express.static(__dirname + '/public/script'));
app.use('/', express.static(__dirname + '/public/views'));

 
app.get("/", (request, response) =>{
    response.sendFile(__dirname + '/public/views/index.html');
})

app.post('/submitFeedback',function(req,res){

    var name=req.body.name;
    var email=req.body.email;
    var topic=req.body.topic;
    var feedback=req.body.feedback;
    
    res.write('Hey  ' + req.body.name+'.\n');
    res.write('Your feedback is submitted.. \nThank you');
    
  
    var sql = "INSERT INTO feedback (name, email, topic, feedback) VALUES ('"+name+"', '"+email+"','"+topic+"', '"+feedback+"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      res.end();
    });    

  })

  app.listen(process.env.PORT, () => console.log("app is running"));
