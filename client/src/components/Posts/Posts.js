

import React from 'react';
import { Grid, CircularProgress } from '@mui/material'; // Updated for MUI v6
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import { MainContainer, SmMargin, ActionDiv } from './styles'; // Ensure you import your styled components

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    console.log(`"in posts.js for id on client side"${posts}`)


    return (
        !posts.length ? <CircularProgress /> : (
            <MainContainer container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} sx={{ padding: 2 }}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </MainContainer>
        )
    );
};

export default Posts;
