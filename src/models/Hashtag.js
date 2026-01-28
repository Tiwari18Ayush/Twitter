const mongoose = require('mongoose');
const { Schema } = mongoose;

const hashTagSchema = new Schema({
  text:{
    type:String,
    unique:true,
    required:true
  },
  tweets:[
    {
        type:mongoose.Schema.Types.ObjectId
    }
  ]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const HashTag = mongoose.model('HashTag',hashTagSchema);

module.exports = HashTag;