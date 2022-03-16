import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, List } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import { styled } from '@mui/system';
import socket from '../socketInstance';
import DrawerDataPending from './DrawerDataPending';
import DrawerDataFriend from './DrawerDataFriend';

function DrawerData() {
    const [data, setData] = useState([]);
    const [dataFriend, setDataFriend] = useState([]);
    const [recognitionToken, setRecognitionToken] = useState(0);
    useEffect(()=>socket.emit("getFriendsData"),[])
    useEffect(()=> {
        socket.on("getFriendsDataCallback",(datas,identifier)=>{
          var datases = JSON.parse(datas)
          datases = datases.filter(item => item.offeror.id !== identifier)
          datases = datases.filter(item => item.accepted !== 1)
          var dataF = JSON.parse(datas)
          dataF = dataF.filter(item => item.accepted !== 0)
          setDataFriend(dataF)
          setRecognitionToken(identifier)
          setData(datases)
        })
        return () => {
          socket.off("getFriendsDataCallback")
        }
    },[])
    const Accordion = styled((props) => (
      <MuiAccordion disableGutters {...props} />
    ))(({ theme }) => ({
      '&:before': {
        display: 'none',
        border: 'none'
    }
    }));
    var reRender = (dataRem, addF) => {
      setData(data.filter(item => item.offeror.id!==dataRem.offeror.id))
      if(addF) setDataFriend([...dataFriend,dataRem])
    }
    return(
        <>
        <Accordion>
            <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
            PENDING
            </AccordionSummary>
            <AccordionDetails>
              <List dense={true}>
                {
                  data.length > 0 ? data.map((datapoint) => <DrawerDataPending key={datapoint.id} data={datapoint} reRenderPending={(addF)=>reRender(datapoint,addF)}/>) : "You have no pending friends."
                }
              </List>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            FRIENDS
            </AccordionSummary>
            <AccordionDetails>
                <List dense={true}>
                  {
                   dataFriend.length > 0 ? dataFriend.map((datapoint) => <DrawerDataFriend key={datapoint.id} data={datapoint} token={recognitionToken}/>) : "You have no friends."
                  }
                </List>
            </AccordionDetails>
        </Accordion>
        </>
    )
}

export default DrawerData;