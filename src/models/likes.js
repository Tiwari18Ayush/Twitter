const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel'   // ⭐ magic line
   },

   onModel: {
      type: String,
      required: true,
      enum: ['Tweet', 'Comment']
   }

}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
