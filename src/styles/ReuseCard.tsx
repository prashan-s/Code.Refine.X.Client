
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {
    Accordion,
    Typography,
    Chip,
    Box
} from '@mui/material';

export const StyledAccordion = styled(Accordion)(() => ({
}));

export const HeaderBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
}));

export const TitleTypography = styled(Typography)(() => ({
    flexGrow: 1,
}));

export const StyledChip = styled(Chip)(({ theme, label }) => ({
    backgroundColor: '#FFEB3B',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    label: label
}));

export const DateTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(2),
}));

export const StyledDeleteIcon = styled(DeleteIcon)(() => ({
    color: 'red',
}));

export const ContentWrapper = styled('div')({
    width: '100%',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    display: 'block',
    boxSizing: 'border-box',
});
