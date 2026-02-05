const commentService = require('../Services/commentService');
const asyncWrapper = require('../utils/common/wrapper');
const SuccessResponse = require('../utils/common/SuccessResponse');


// ======================================================
// COMMENT ON TWEET
// POST /tweets/:tweetId/comment
// ======================================================
const createTweetComment = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const tweetId = req.params.tweetId;
  const { content } = req.body;

  const comment = await commentService.createComment(
    userId,
    tweetId,
    'Tweet',
    content
  );

  SuccessResponse.data = comment;
  SuccessResponse.message = 'Comment added successfully';

  return res.status(201).json(SuccessResponse);
});


// ======================================================
// REPLY TO COMMENT
// POST /comments/:commentId/reply
// ======================================================
const replyToComment = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;
  const { content } = req.body;

  const reply = await commentService.createComment(
    userId,
    commentId,
    'Comment',
    content
  );

  SuccessResponse.data = reply;
  SuccessResponse.message = 'Reply added successfully';

  return res.status(201).json(SuccessResponse);
});


// ======================================================
// GET COMMENTS FOR TWEET
// GET /tweets/:tweetId/comments
// ======================================================
const getTweetComments = asyncWrapper(async (req, res) => {
  const tweetId = req.params.tweetId;

  const comments = await commentService.getComments(tweetId, 'Tweet');

  SuccessResponse.data = comments;
  return res.status(200).json(SuccessResponse);
});


// ======================================================
// GET REPLIES
// GET /comments/:commentId/replies
// ======================================================
const getReplies = asyncWrapper(async (req, res) => {
  const commentId = req.params.commentId;

  const replies = await commentService.getComments(commentId, 'Comment');

  SuccessResponse.data = replies;
  return res.status(200).json(SuccessResponse);
});


// ======================================================
// DELETE COMMENT
// DELETE /comments/:commentId
// ======================================================
const deleteComment = asyncWrapper(async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;
  await commentService.deleteComment(commentId,userId);

  SuccessResponse.message = 'Comment deleted successfully';

  return res.status(200).json(SuccessResponse);
});


module.exports = {
  createTweetComment,
  replyToComment,
  getTweetComments,
  getReplies,
  deleteComment
};
