import axios from 'axios';

// Create a custom Axios instance with baseURL
const API = axios.create({ baseURL: 'http://localhost:5000' }); // assuming /posts is the endpoint

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile'))
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    return req;
})
// Fetch all posts
export const fetchPosts = () => API.get('/posts');

// Create a new post
export const createPost = (newPost) => API.post('/posts', newPost);

// Update a post
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

// Delete a post
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Like a post
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);



// Fix: corrected endpoint path from '/user/...' to '/users/...'
export const signIn = (form) => API.post('/users/signin', form);
export const signUp = (form) => API.post('/users/signup', form);


// modification after intial steps in step-38
// form = formData here 
