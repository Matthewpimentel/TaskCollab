const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  tasks: [{ title: String, status: String, assignedTo: String }],
  users: [String],
});

module.exports = mongoose.model('Board', boardSchema);