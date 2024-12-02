const Post = require('../models/Post');
const User = require('../models/User')
const createPost = async (req, res) => {
	try {
		const { title, image, description, userId } = req.body;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}
		const newPost = new Post({ title, image, description, userId });
		const savepost = await newPost.save();
		res.status(201).json(savepost);
	} catch (error) {
		console.error(error)
	}
}
const likeUnlikePost = async (req, res) => {
	try {
		const userId = req.user._id;
		const { id: postId } = req.params;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.votes.includes(userId);

		if (userLikedPost) {
			await Post.updateOne({ _id: postId }, { $pull: { votes: userId } });
			await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

			const updatedLikes = post.votes.filter((id) => id.toString() !== userId.toString());
			res.status(200).json(updatedLikes);
		} else {

			post.votes.push(userId);
			await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
			await post.save();


			const updatedLikes = post.votes;
			res.status(200).json(updatedLikes);
		}
	} catch (error) {
		console.log("Error in likeUnlikePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(201).json(posts);
	} catch (error) {
		console.error(error);
	}
}
const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(201).json(post);
	} catch (error) {
		console.error(error);
	}
}
module.exports = { createPost, likeUnlikePost, getPost, getPosts }