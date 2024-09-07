import {
    AccordionSummary,
    AccordionDetails,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axiosInstance from "src/utils/axiosInstance";
import { GoLink } from "react-icons/go";
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

interface GistCardProps {
    id: number;
    title: string;
    content: string;
    language: string;
    createdDate: string;
    url: string;
    onClick: () => void;
}


const GistCard: React.FC<GistCardProps> = (props) => {
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
                    <TitleTypography variant="h8">
                        {props.title}
                    </TitleTypography>
                    {/*<StyledChip label="Java" />*/}
                </HeaderBox>
            </AccordionSummary>
            <AccordionDetails>
                <ContentWrapper>
                    {props.content}
                </ContentWrapper>
                <ButtonBox>
                    <GoLink
                        aria-label="delete"
                        onClick={props.onClick}
                    >
                        <StyledDeleteIcon />
                    </GoLink>
                </ButtonBox>
            </AccordionDetails>
        </StyledAccordion>
    );
};


export default GistCard;
