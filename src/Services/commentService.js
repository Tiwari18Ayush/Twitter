const CommentRepository = require('../Repository/comment-Repository');
const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');

const commentRepository = new CommentRepository();


// =====================================================
// CREATE COMMENT OR REPLY (generic)
// =====================================================
async function createComment(userId, parentId, onModel, content) {

  if (!['Tweet', 'Comment'].includes(onModel)) {
    throw new AppError('Invalid parent type', StatusCodes.BAD_REQUEST);
  }

  // create comment
  const comment = await commentRepository.create({
    content,
    user: userId,
    parent: parentId,
    onModel
  });

  // ---------------- update counters ----------------
  if (onModel === 'Tweet') {
    await commentRepository.incrementTweetComments(parentId, 1);
  }

  if (onModel === 'Comment') {
    await commentRepository.incrementReplies(parentId, 1);
  }

  return comment;
}


// =====================================================
// GET COMMENTS / REPLIES
// =====================================================
async function getComments(parentId, onModel) {

  return commentRepository.getByParent(parentId, onModel);
}


// =====================================================
// DELETE COMMENT
// =====================================================
async function deleteComment(commentId) {

  const comment = await commentRepository.get(commentId);

  if (!comment) {
    throw new AppError('Comment not found', StatusCodes.NOT_FOUND);
  }

  // decrease counters
  if (comment.onModel === 'Tweet') {
    await commentRepository.incrementTweetComments(comment.parent, -1);
  }

  if (comment.onModel === 'Comment') {
    await commentRepository.incrementReplies(comment.parent, -1);
  }

  await commentRepository.delete(commentId);

  return true;
}


// =====================================================
// UPDATE COMMENT LIKE COUNT
// (used by LikeService later)
// =====================================================
async function updateCommentLikes(commentId, value) {
  return commentRepository.incrementLikes(commentId, value);
}


module.exports = {
  createComment,
  getComments,
  deleteComment,
  updateCommentLikes
};
