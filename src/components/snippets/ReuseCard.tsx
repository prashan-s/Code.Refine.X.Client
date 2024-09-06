import {
    AccordionSummary,
    AccordionDetails,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axiosInstance from "src/utils/axiosInstance";

import {
    StyledAccordion,
    HeaderBox,
    TitleTypography,
    StyledChip,
    DateTypography,
    ButtonBox,
    StyledDeleteIcon,
    ContentWrapper
} from '@styles/ReuseCard'

interface ReuseCardProps {
    id: number;
    title: string;
    content: string;
    language: string;
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
                <StyledChip label={props.language} />
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
