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
    let module1 = require("../../frontend/src/components/questions/module1.js")
    let client = fields.client
    let nxtClient
    if (client === 'clientA') {
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
    if (files.hasOwnProperty('image')) {
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
    if (qnNumber - 1 >= 0) {
      prevMove = qnNumber - 1
    } else {
      prevMove = null
    }
    module1[client][qnNumber].nextMove = nxtClient
    module1[client][qnNumber].prevMove = prevMove
    module1 = "module.exports = " + JSON.stringify(module1)
    fs.writeFile(__dirname + "/../../frontend/src/components/questions/module1.js", module1, (err) => {
      if (!err) {
        winston.info("Question added successfully")
        res.status(200).send("Question added")
      } else {
        winston.error(err)
        res.status(400).send("Failed to add question")
      }
    })
  })
})
app.post('/saveModule2Question', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    let module2 = require("../../frontend/src/components/questions/module2.js")
    let situationText = fields.situationText
    let choice1 = fields.choice1
    let choice1Comment = fields.choice1Comment
    let choice1Correct = fields.choice1Correct
    let choice1Impact = fields.choice1Impact
    let choice1Bonus = fields.choice1Bonus
    let choice2 = fields.choice2
    let choice2Comment = fields.choice2Comment
    let choice2Correct = fields.choice2Correct
    let choice2Impact = fields.choice2Impact
    let choice2Bonus = fields.choice2Bonus
    let choice3 = fields.choice3
    let choice3Comment = fields.choice3Comment
    let choice3Correct = fields.choice3Correct
    let choice3Impact = fields.choice3Impact
    let choice3Bonus = fields.choice3Bonus
    let qnNumber = Object.keys(module2).length
    if (files.hasOwnProperty('image')) {
      let destination = __dirname + "/../../frontend/src/components/questions/images/"
      let file_name = "module2" + qnNumber + files.image.name
      fs.copyFile(files.image.path, destination + file_name, function (err) {
        if (err) {
          winston.error(err)
        } else {
          winston.info("Image copied successfully")
        }
      })
    }

    if (qnNumber - 1 >= 0) {
      module2[qnNumber - 1].nextMove = qnNumber
    }
    module2[qnNumber] = {}
    module2[qnNumber].situationText = situationText
    module2[qnNumber].choices = []
    module2[qnNumber].choices.push({
      'choiceText': choice1,
      'comment': choice1Comment,
      'correct': choice1Correct,
      'impact': choice1Impact,
      'bonus': choice1Bonus
    })
    if (fields.subchoice11 || fields.subchoice12 || fields.subchoice13) {
      module2[qnNumber].choices[0].choices = []
      if (fields.subchoice11) {
        module2[qnNumber].choices[0].choices.push({
          'choiceText': fields.subchoice11,
          'correct': fields.subchoice11Correct,
          'impact': fields.subchoice11Impact,
          'bonus': fields.subchoice11Bonus
        })
      }
      if (fields.subchoice12) {
        module2[qnNumber].choices[0].choices.push({
          'choiceText': fields.subchoice12,
          'correct': fields.subchoice12Correct,
          'impact': fields.subchoice12Impact,
          'bonus': fields.subchoice12Bonus
        })
      }
      if (fields.subchoice13) {
        module2[qnNumber].choices[0].choices.push({
          'choiceText': fields.subchoice13,
          'correct': fields.subchoice13Correct,
          'impact': fields.subchoice13Impact,
          'bonus': fields.subchoice13Bonus
        })
      }
    }
    module2[qnNumber].choices.push({
      'choiceText': choice2,
      'comment': choice2Comment,
      'correct': choice2Correct,
      'impact': choice2Impact,
      'bonus': choice2Bonus
    })
    if (fields.subchoice21 || fields.subchoice22 || fields.subchoice23) {
      module2[qnNumber].choices[1].choices = []
      if (fields.subchoice21) {
        module2[qnNumber].choices[1].choices.push({
          'choiceText': fields.subchoice21,
          'correct': fields.subchoice21Correct,
          'impact': fields.subchoice21Impact,
          'bonus': fields.subchoice21Bonus
        })
      }
      if (fields.subchoice22) {
        module2[qnNumber].choices[1].choices.push({
          'choiceText': fields.subchoice22,
          'correct': fields.subchoice22Correct,
          'impact': fields.subchoice22Impact,
          'bonus': fields.subchoice22Bonus
        })
      }
      if (fields.subchoice23) {
        module2[qnNumber].choices[1].choices.push({
          'choiceText': fields.subchoice23,
          'correct': fields.subchoice23Correct,
          'impact': fields.subchoice23Impact,
          'bonus': fields.subchoice23Bonus
        })
      }
    }
    module2[qnNumber].choices.push({
      'choiceText': choice3,
      'comment': choice3Comment,
      'correct': choice3Correct,
      'impact': choice3Impact,
      'bonus': choice3Bonus
    })
    if (fields.subchoice31 || fields.subchoice32 || fields.subchoice33) {
      module2[qnNumber].choices[2].choices = []
      if (fields.subchoice31) {
        module2[qnNumber].choices[2].choices.push({
          'choiceText': fields.subchoice31,
          'correct': fields.subchoice31Correct,
          'impact': fields.subchoice31Impact,
          'bonus': fields.subchoice31Bonus
        })
      }
      if (fields.subchoice32) {
        module2[qnNumber].choices[2].choices.push({
          'choiceText': fields.subchoice32,
          'correct': fields.subchoice32Correct,
          'impact': fields.subchoice32Impact,
          'bonus': fields.subchoice32Bonus
        })
      }
      if (fields.subchoice33) {
        module2[qnNumber].choices[2].choices.push({
          'choiceText': fields.subchoice33,
          'correct': fields.subchoice33Correct,
          'impact': fields.subchoice33Impact,
          'bonus': fields.subchoice33Bonus
        })
      }
    }
    let prevMove
    if (qnNumber - 1 >= 0) {
      prevMove = qnNumber - 1
    } else {
      prevMove = null
    }
    module2[qnNumber].nextMove = null
    module2[qnNumber].prevMove = prevMove
    module2 = "module.exports = " + JSON.stringify(module2)
    fs.writeFile(__dirname + "/../../frontend/src/components/questions/module2.js", module2, (err) => {
      if (!err) {
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