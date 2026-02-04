const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 280
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // ⭐ parent can be Tweet OR Comment
    parent: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel'
    },

    onModel: {
      type: String,
      required: true,
      enum: ['Tweet', 'Comment']
    },

    likesCount: {
      type: Number,
      default: 0
    },

    repliesCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
