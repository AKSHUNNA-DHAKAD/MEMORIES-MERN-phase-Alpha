import React from 'react';
import { Typography, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';
import {
    Media,
    Overlay,
    Overlay2,
    Details,
    Title,
    CustomCard,
    CustomCardActions,
} from './styles';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();

    // Fallback values for undefined properties
    const {
        _id,
        selectedFile,
        createdAt,
        tags = [],
        title = 'Untitled Post',
        message = 'No content available.',
       
    } = post || {}; // Ensure `post` is valid
    const user = JSON.parse(localStorage.getItem('profile'))

    const Likes = () => {
        const userId = user?.result?.googleId || user?.result?._id;
        const hasLikedPost = post.likes?.includes(userId);

        const likeCount = post.likes?.length || 0;

        if (likeCount === 0) {
            return (
                <>
                    <ThumbUpAltOutlined fontSize="small" />&nbsp;Like
                </>
            );
        }

        return hasLikedPost ? (
            <>
                <ThumbUpAltIcon fontSize="small" />&nbsp;
                {likeCount > 2
                    ? `You and ${likeCount - 1} others`
                    : `${likeCount} like${likeCount > 1 ? 's' : ''}`}
            </>
        ) : (
            <>
                <ThumbUpAltOutlined fontSize="small" />&nbsp;
                {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </>
        );
    };

    return (
        <CustomCard>
            <Media
                style={{
                    backgroundImage: `url(${selectedFile ||
                        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px', // Specify the height to make the image visible
                    width: '100%', // Ensure it spans the card width
                }}
            />
            <Overlay>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
            </Overlay>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Overlay2>
                <Button
                    style={{ color: 'white' }}
                    size="medium"
                    onClick={() => setCurrentId(_id)}
                    aria-label="Edit Post"
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </Overlay2>)}
            <Details>
                <Typography variant="body2" color="textSecondary">
                    {tags.map((tag) => `#${tag} `)}
                </Typography>
            </Details>
            <Title>{title}</Title>
            <Typography variant="body2" color="textSecondary" sx={{ padding: '0 16px' }}>
                {message}
            </Typography>
            <CustomCardActions>
                <Button
                    size="small"
                    color="primary"
                    disabled ={!user?.result}
                    onClick={() => dispatch(likePost(_id))}
                    aria-label="Like Post"
                >
                    {/* <ThumbUpAltIcon fontSize="small" /> &nbsp;Like&nbsp;
                    {likeCount} */}
                    <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(deletePost(_id))}
                        aria-label="Delete Post"
                    >
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </CustomCardActions>
        </CustomCard>
    );
};

export default Post;
