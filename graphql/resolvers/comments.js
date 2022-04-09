const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Mutation: {
		async createComment(parent, args, context) {
			const { postId, body } = args;
			const { username } = checkAuth(context);
			if (body.trim() === '') {
				throw new UserInputError('Empty comment', {
					errors: {
						body: 'Comment body must not be empty',
					},
				});
			}
			const post = await Post.findById(postId);
			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await post.save();
				return post;
			} else throw new UserInputError('Post not found');
		},
		async deleteComment(parent, args, context) {
			const { postId, commentId } = args;
			const { username } = checkAuth(context);
			const post = await Post.findById(postId);
			if (post) {
				const commentIndex = post.comments.findIndex(
					comment => comment.id === commentId
				);
				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					await post.save();
					return post;
				} else throw new AuthenticationError('Action not allowed');
			} else throw new UserInputError('Post not found');
		},
		async likePost(parent, args, context) {
			const { postId } = args;
			const { username } = checkAuth(context);
			const post = await Post.findById(postId);
			if (post) {
				if (post.likes.find(like => like.username === username)) {
					// If post have a like already filter it
					post.likes = post.likes.filter(like => like.username !== username);
				} else {
					post.likes.push({
						username,
						cratedAt: new Date().toISOString(),
					});
				}
				await post.save();
				return post;
			} else throw new UserInputError('Post not found');
		},
	},
};
