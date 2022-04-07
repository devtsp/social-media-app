const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
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
	},
};
