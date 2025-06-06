// import { styled } from '@mui/system';
// import { TextField, Button, Paper } from '@mui/material';

// const Root = styled('div')(({ theme }) => ({
//     '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//     },
// }));

// // Renamed from 'Form' to 'StyledForm' to avoid conflict
// const StyledForm = styled('form')({
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
// });

// const FileInput = styled(TextField)({
//     width: '97%',
//     margin: '10px 0',
// });

// const ButtonSubmit = styled(Button)({
//     marginBottom: 10,
// });

// const PaperWrapper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
// }));

// export { Root, StyledForm, FileInput, ButtonSubmit, PaperWrapper };

import { makeStyles } from '@mui/material';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
    },
}));