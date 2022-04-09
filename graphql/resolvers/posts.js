const { AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt: -1 });
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getPost(parent, args) {
			const { postId } = args;
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createPost(parent, args, context) {
			const { body } = args;
			const user = checkAuth(context);
			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});
			const post = await newPost.save();
			return post;
		},
		async deletePost(parent, args, context) {
			const { postId } = args;
			console.log('post to delete: ', postId);
			const user = checkAuth(context);
			console.log('user requesting: ', user);
			try {
				const post = await Post.findById(postId);
				console.log('post in db: ', post);
				if (user.username === post.username) {
					await post.delete();
					return 'Post deleted succesfully';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error(`${err.name}: ${err.message}`);
			}
		},
	},
	Subscription: {
		newPost: {
			subscribe(parent, args, context) {
				const { pubsub } = context;
				return pubsub.asyncIterator('NEW_POST');
			},
		},
	},
};
