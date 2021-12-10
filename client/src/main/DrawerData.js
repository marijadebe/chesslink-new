import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';

import { styled } from '@mui/system';

function DrawerData() {
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }));
    return(
        <>
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
            PENDING
            </AccordionSummary>
            <AccordionDetails>
                dasads
            </AccordionDetails>
        </Accordion>
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            FRIENDS
            </AccordionSummary>
            <AccordionDetails>
                dasdadsdas
            </AccordionDetails>
        </Accordion>
        </>
    )
}

export default DrawerData;