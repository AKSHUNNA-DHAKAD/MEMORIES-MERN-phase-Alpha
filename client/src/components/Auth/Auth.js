import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import Input from '../Auth/Input';
import { signin, signup } from '../../actions/auth';
// import { AUTH } from '../../constants/actionTypes';

// Styled Components (Replaces makeStyles)
const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (credentialResponse) => {
        console.log('Google login response:', credentialResponse);

        const token = credentialResponse.credential;
        if (!token) {
            console.error('No credential received');
            return;
        }

        const decoded = jwtDecode(token);
        console.log('Decoded user info:', decoded);

        try {
            const userData = decoded; // Renamed from 'result' to 'userData'

            // Store in Redux and localStorage using 'userData'
            dispatch({ type: 'AUTH', data: { result: userData, token } });

            localStorage.setItem('profile', JSON.stringify({ result: userData, token }));

            navigate('/');
        } catch (error) {
            console.log('Google sign in error', error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was Unsuccessful. Try again later.');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form) 
        
        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <StyledAvatar>
                    <LockOutlinedIcon />
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                handleShowPassword={handleShowPassword}
                            />
                        </Grid>
                        {isSignup && (
                            <Grid item xs={12}>
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                            </Grid>
                        )}
                    </Grid>

                    <StyledSubmitButton type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </StyledSubmitButton>

                    <GoogleOAuthProvider clientId="370531972893-jpl1adm1mc23csetflqdm7392sp5s4v1.apps.googleusercontent.com">
                        <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
                    </GoogleOAuthProvider>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
        </Container>
    );
};

export default SignUp;


