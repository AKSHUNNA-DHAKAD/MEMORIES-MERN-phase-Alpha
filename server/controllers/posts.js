import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        // PostMessages is a schema to perfrom PostMessage.find() will take time therefore we will use await and async
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    // PostMessage is a model for postSchema 

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    //  this line creates a new object for PostMessage using the data stored in this model
    // this object is then stored into the constant named newPost 
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {

        return res.status(404).send('No posts with such id');
    }

    try {
        // Use the correct Mongoose method findByIdAndUpdate
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating post' });
    }
};


export const deletePost = async (req, res) => {
    const { id } = req.params;  // ✅ Corrected to `id`

    console.log("Backend received ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with such id');
    }

    const deletedPost = await PostMessage.findByIdAndDelete(id); // ✅ Use `findByIdAndDelete` instead of 'findByIdAndRemove', it is outdated

    if (!deletedPost) {
        return res.status(404).json({ message: "No post found with this ID" });
    }

    res.json({ message: "Post deleted successfully" });
    console.log('Controller code working');
};

//  * means below line is  this added later as as a part of  auth controller in step 37
export const likePost = async (req, res) => {
    const { id } = req.params
    // *
    if (!req.userId) return res.json({ message: "UnAuthenticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO Post with that id');
    const post = await PostMessage.findById(id);
    // *
    const index = post.likes.findIndex((id) => id == String(req.userId));
    // *
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }
    //* 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost);
}
