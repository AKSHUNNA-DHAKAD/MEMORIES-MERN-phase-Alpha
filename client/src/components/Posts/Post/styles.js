import { styled } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

// export const Media = styled('div')(({ theme }) => ({
//     height: 0,
//     paddingTop: '56.25%', // Aspect ratio (16:9)
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     backgroundBlendMode: 'darken',
// }));
export const Media = styled('div')(({ theme }) => ({
    height: '300px', // Set a fixed height for all images
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const Border = styled('div')(({ theme }) => ({
    border: 'solid',
    borderColor: theme.palette.primary.main,
}));

export const FullHeightCard = styled('div')({
    height: '100%',
});

// export const CustomCard = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     borderRadius: '15px',
//     height: '100%',
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[3],
// });
export const CustomCard = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '500px', // Set a fixed height for consistency
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    overflow: 'hidden', // Prevent content overflow
});

export const Overlay = styled('div')({
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
});

export const Overlay2 = styled('div')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
});

export const GridContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
});

export const Details = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
});

export const Title = styled('h2')({
    padding: theme.spacing(0, 2),
    fontSize: theme.typography.h6.fontSize,
});

export const CustomCardActions = styled('div')({
    padding: theme.spacing(0, 2, 1),
    display: 'flex',
    justifyContent: 'space-between',
});
