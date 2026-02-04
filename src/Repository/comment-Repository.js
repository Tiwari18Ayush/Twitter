const Comment = require('../models/comment');
const Tweet = require('../models/Tweet');

class CommentRepository {

  // =========================
  // CREATE
  // =========================
  async create(data) {
    return Comment.create(data);
  }


  // =========================
  // GET children of parent
  // (tweet comments OR replies)
  // =========================
  async getByParent(parentId, onModel) {
    return Comment.find({
      parent: parentId,
      onModel
    })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
  }


  // =========================
  // DELETE
  // =========================
  async delete(commentId) {
    return Comment.findByIdAndDelete(commentId);
  }


  // =========================
  // increment comment likes
  // =========================
  async incrementLikes(commentId, value) {
    return Comment.updateOne(
      { _id: commentId },
      { $inc: { likesCount: value } }
    );
  }


  // =========================
  // increment replies count
  // =========================
  async incrementReplies(commentId, value) {
    return Comment.updateOne(
      { _id: commentId },
      { $inc: { repliesCount: value } }
    );
  }


  // =========================
  // increment tweet comments
  // =========================
  async incrementTweetComments(tweetId, value) {
    return Tweet.updateOne(
      { _id: tweetId },
      { $inc: { commentsCount: value } }
    );
  }


  // =========================
  // get single comment
  // =========================
  async get(commentId) {
    return Comment.findById(commentId).populate('user', 'username');
  }
}

module.exports = CommentRepository;
