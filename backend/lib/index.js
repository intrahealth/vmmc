require('./init');
const express = require('express');
const formidable = require('formidable');
const winston = require('winston')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const config = require('./config');
const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.post('/saveModule1Question', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    
  })
})
app.post('/saveModule2Question', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    let module1 = require("../../frontend/src/components/questions/module1.js")
    let client = fields.client
    let nxtClient
    if(client === 'clientA') {
      nxtClient = 'clientB'
    } else if (client === 'clientB') {
      nxtClient = 'clientC'
    } else {
      nxtClient = null
    }
    let situationText = fields.situationText
    let choice1 = fields.choice1
    let choice1Comment = fields.choice1Comment
    let choice1Impact = fields.choice1Impact
    let choice2 = fields.choice2
    let choice2Comment = fields.choice2Comment
    let choice2Impact = fields.choice2Impact
    let choice3 = fields.choice3
    let choice3Comment = fields.choice3Comment
    let choice3Impact = fields.choice3Impact
    let qnNumber = Object.keys(module1[client]).length
    if(files.hasOwnProperty('image')) {
      let destination = __dirname + "/../../frontend/src/components/questions/images/"
      let file_name = "module1" + client + qnNumber + files.image.name
      fs.copyFile(files.image.path, destination + file_name, function (err) {
        if (err) {
          winston.error(err)
        } else {
          winston.info("Image copied successfully")
        }
      })
    }
    
    if (qnNumber - 1 >= 0) {
      module1[client][qnNumber - 1].nextMove = qnNumber
    }
    module1[client][qnNumber] = {}
    module1[client][qnNumber].situationText = situationText
    module1[client][qnNumber].choices = []
    module1[client][qnNumber].choices.push({
      'choiceText': choice1,
      'comment': choice1Comment,
      'impact': choice1Impact
    })
    module1[client][qnNumber].choices.push({
      'choiceText': choice2,
      'comment': choice2Comment,
      'impact': choice2Impact
    })
    module1[client][qnNumber].choices.push({
      'choiceText': choice3,
      'comment': choice3Comment,
      'impact': choice3Impact
    })
    let prevMove
    if(qnNumber - 1 >= 0) {
      prevMove = qnNumber - 1
    } else {
      prevMove = null
    }
    module1[client][qnNumber].nextMove = nxtClient
    module1[client][qnNumber].prevMove = prevMove
    module1 = "module.exports = " + JSON.stringify(module1)
    fs.writeFile(__dirname + "/../../frontend/src/components/questions/module1.js", module1, (err) => {
      if(!err) {
        winston.info("Question added successfully")
        res.status(200).send("Question added")
      } else {
        winston.error(err)
        res.status(400).send("Failed to add question")
      }
    })
  })
})
server.listen(config.getConf('server:port'));
winston.info(`Server is running and listening on port ${config.getConf('server:port')}`);