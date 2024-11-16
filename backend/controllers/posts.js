const Post = require('../models/Post')
const createpost = async(req,res)=> {
    try {
     const newpost = new Post(req.body);
     const savepost = await newpost.save();
     res.status(201).json(savepost);
    } catch (error) {
        console.error(error);
    }
}
const getpost = async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);


    }
}
const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

	
		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likeUnlikePost = async (req, res) => {
	try {
		const { id: postId } = req.params;
		const userId = req.user._id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.votes.includes(userId);

		if (userLikedPost) {
			
			await Post.updateOne({ _id: postId }, { $pull: { votes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
		
			post.votes.push(userId);
			await post.save();
			res.status(200).json({ message: "Post liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getposts= async(req,res)=> {
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
    }
}
module.exports = {createpost,getposts,getpost,likeUnlikePost,deletePost};