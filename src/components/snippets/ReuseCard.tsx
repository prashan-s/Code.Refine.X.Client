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
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/Snippets/${props.id}`, {})
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
              <TitleTypography variant="h6">{props.title}</TitleTypography>
            </HeaderBox>
          </AccordionSummary>
          <AccordionDetails>
            <ContentWrapper>{props.content}</ContentWrapper>
            <DateTypography variant="body2">
              {new Date(props.createdDate).toLocaleString()}
            </DateTypography>
      
            {/* Flex container for language and delete button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
              }}
            >
              {/* Language label aligned to the left */}
              <StyledChip
                label={props.language}
                style={{
                  backgroundColor: '#f1f1f1',
                  color: '#666',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                }}
              />
      
              {/* Delete button aligned to the right */}
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete()}
                style={{
                  color: '#ff1744',
                  transition: 'color 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#d50000')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ff1744')}
              >
                <StyledDeleteIcon />
              </IconButton>
            </div>
          </AccordionDetails>
        </StyledAccordion>
      );
      
};


export default ReuseCard;
