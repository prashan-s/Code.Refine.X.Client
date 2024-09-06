import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Box,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import axiosInstance from "src/utils/axiosInstance";


const StyledAccordion = styled(Accordion)(() => ({
}));

const HeaderBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
}));

const TitleTypography = styled(Typography)(() => ({
    flexGrow: 1,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: '#FFEB3B',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
}));

const DateTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const ButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(2),
}));

const StyledDeleteIcon = styled(DeleteIcon)(() => ({
    color: 'red',
}));

const ContentWrapper = styled('div')({
    width: '100%',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    display: 'block',
    boxSizing: 'border-box',
});

interface ReuseCardProps {
    id: number;
    title: string;
    content: string;
    createdDate: string;
}


const ReuseCard: React.FC<ReuseCardProps> = (props) => {
    const handleDelete = async (id: number) => {
        try {
            await axiosInstance.delete(`/api/Snippets/${props.id}`, {})
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment');
        }
    };

    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <HeaderBox>
                    <TitleTypography variant="h6">
                        {props.title}
                    </TitleTypography>
                    {/*<StyledChip label="Java" />*/}
                    <DateTypography variant="body2">
                        {props.createdDate}
                    </DateTypography>
                </HeaderBox>
            </AccordionSummary>
            <AccordionDetails>
                <ContentWrapper>
                    {props.content}
                </ContentWrapper>
                <ButtonBox>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(props.id)}
                    >
                        <StyledDeleteIcon />
                    </IconButton>
                </ButtonBox>
            </AccordionDetails>
        </StyledAccordion>
    );
};


export default ReuseCard;
