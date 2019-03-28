const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Roles = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

let Users = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  otherName: {
    type: String
  },
  surname: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles',
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  lastModified: {
    type: Date
  }
})
let answers = new mongoose.Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  sessionID: {
    type: String,
    required: true
  },
  module: {
    type: Number,
    required: true
  },
  answers: {
    type: Object
  }
})

let RolesModel = mongoose.model('Roles', Roles)
let UsersModel = mongoose.model('Users', Users)
let answersModel = mongoose.model('answers', answers)
module.exports = {
  UsersModel,
  RolesModel,
  answersModel
}