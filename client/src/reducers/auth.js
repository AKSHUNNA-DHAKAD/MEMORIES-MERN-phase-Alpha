import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    console.log("auth reducer working")
    switch (action.type) {
        case AUTH:
            // saving this data to the local storage so that the browser can remember that we logged in even after the page refreshes
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };

        default:
            return state;
    }
};
export default authReducer;  