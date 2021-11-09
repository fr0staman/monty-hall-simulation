const {Schema, model} = require('mongoose');

const schema = new Schema({
  unchanged: {type: Number, index: true},
  changed: {type: Number, index: true},
});

module.exports = model('Result', schema);