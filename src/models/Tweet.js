const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
    content: {
        type: String,
        required: [true, "Tweet content cannot be empty"], // Validation
        maxlength: [280, "Tweet cannot exceed 280 characters"] // Twitter limit!
    },
    likes: {
        type: Number,
        default: 0 // Starts at 0
    },
    noOfRetweets: {
        type: Number,
        default: 0
    },
    // Reference to a 'Comment' model (if you have one)
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' 
        }
    ]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;