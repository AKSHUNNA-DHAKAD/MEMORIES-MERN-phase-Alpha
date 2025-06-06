
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({  title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({  title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({...postData, name:user?.result?.name}));
      clear();
    }
    else {
      dispatch(updatePost(currentId, postData));
    }
    clear();
  };
  if (!user?.result?.name) {
    return (
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like others' memories.
        </Typography>
      </Paper>
    );
  }
  

  return (
    <Paper sx={{ padding: 2 }}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {currentId ? `Editing ` : 'Creating '} a Memory  </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          sx={{ marginBottom: 2 }}
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          sx={{ marginBottom: 2 }}
        />
        <div style={{ width: '97%', margin: '10px 0' }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          sx={{ marginBottom: 2 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;





