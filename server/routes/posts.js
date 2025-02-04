import express from 'express';
import { getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/posts.js';

const router = express.Router();

// Define a GET route for the root URL of the "posts" endpoint
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost)
router.patch('/:id/likePost', likePost);
export default router;
