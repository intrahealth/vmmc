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

let RolesModel = mongoose.model('Roles', Roles)
let UsersModel = mongoose.model('Users', Users)
module.exports = {
  UsersModel,
  RolesModel
}