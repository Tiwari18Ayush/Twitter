const CommentRepository = require('../Repository/comment-Repository');
const tweetRepository=require('../Repository/Tweet-Repository');
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
async function deleteComment(commentId, requestingUserId) {
    // 1. Fetch the comment
    const comment = await commentRepository.get(commentId);
    
    if (!comment) {
        throw new AppError('Comment not found', StatusCodes.NOT_FOUND);
    }

    // 2. Fetch the author of the comment (using your existing method)
    const commentAuthorId = await commentRepository.getuserfromComment(commentId);

    // 3. Find the owner of the "Top-level" Tweet
    // We need to know who owns the Tweet this comment (or reply) belongs to
    let tweetOwnerId = null;
    
    if (comment.onModel === 'Tweet') {
        const tweet = await tweetRepository.get(comment.parent);
        tweetOwnerId = tweet?.user;
    } else if (comment.onModel === 'Comment') {
        // If it's a reply to another comment, you might need to recurse 
        // or just fetch the parent comment's tweet
        const parentComment = await commentRepository.get(comment.parent);
        const parentTweet = await tweetRepository.get(parentComment.parent);
        tweetOwnerId = parentTweet?.user;
    }

    // 4. Authorization Logic: Is the requester the Author OR the Tweet Owner?
    const isAuthor = commentAuthorId.toString() === requestingUserId.toString();
    const isTweetOwner = tweetOwnerId && tweetOwnerId.toString() === requestingUserId.toString();

    if (!isAuthor && !isTweetOwner) {
        throw new AppError("User Not Authorized to delete this comment", StatusCodes.UNAUTHORIZED);
    }

    // 5. Decrease counters
    if (comment.onModel === 'Tweet') {
        await commentRepository.incrementTweetComments(comment.parent, -1);
    } else if (comment.onModel === 'Comment') {
        await commentRepository.incrementReplies(comment.parent, -1);
    }

    // 6. Delete the comment
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
