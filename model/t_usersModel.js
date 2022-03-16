const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    change: {
      type:String
    },

    old:{
      type: String
    },

    new: {
    type:String

    },
   
   
},{timestamps:true});

const t_user = mongoose.model('t_user',userSchema);

module.exports = t_user;