const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({

Name:{
    type: String
},

LocationUrl:{
    type: String
}



});

const content = mongoose.model('contents',contentSchema);

module.exports = content;