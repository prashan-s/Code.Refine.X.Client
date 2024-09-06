import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDropDown';

//According for snippets
const snippetAcc =  function AccordionExpandIcon(content:string, title:string) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content}
                    </Typography>
                </AccordionDetails>
            </Accordion>
    </div>
    );
}

export default snippetAcc;
