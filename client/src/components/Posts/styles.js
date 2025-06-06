import { styled } from '@mui/system';

export const MainContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

export const SmMargin = styled('div')(({ theme }) => ({
    margin: theme.spacing ? theme.spacing(1) : '8px', // Fallback for theme.spacing
}));

export const ActionDiv = styled('div')({
    textAlign: 'center',
});