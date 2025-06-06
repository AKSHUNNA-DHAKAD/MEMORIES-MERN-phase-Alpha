import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// ✅ dispatch is passed in by Redux Thunk
export const signin = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(form); // API call
        dispatch({ type: AUTH, data });          // Save user to Redux
        navigate('/');                           // Navigate to homepage
    } catch (error) {
        console.log(error);
    }
};

export const signup = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(form);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(' Error:', error.response?.data?.message || error.message);

    }
};
