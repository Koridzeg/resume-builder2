import { Box, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import phone from '../images/phone.png'
import mail from '../images/mail.png'
import smallLine from '../images/smallline.png'

const FinishedResume = () => {
    const location = useLocation();

    // Access the state from location.state
    const state = location.state;
    return (
        <Box display='flex' minHeight='100vh' justifyContent='center' alignItems='center' >
        <Box display='flex' width='822px' height='900px' padding='5em' gap='1em' border='1px solid black' flexDirection='column'>
        <Box display='flex' justifyContent='flex-start'  gap='1em'>
            <img src={state.image} alt="asdasdasdasdas" />
            <Typography fontSize='34px' color='#F93B1D' fontWeight='700'>{state.name}</Typography>
            <Typography fontSize='34px' color='#F93B1D' fontWeight='700'>{state.surname}</Typography>
        </Box>
        <Box display='flex' paddingLeft='0.5em' flexDirection='column' gap='0.5em' paddingTop='1em'>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center' maxWidth='65%'>
                    <img style={{ width: '20px', height: '20px' }} src={mail} alt="" />
                    <Typography fontSize='20px' maxWidth='65%' style={{ wordWrap: "break-word" }}>{state.email}</Typography>
                </Box>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{ width: '20px', height: '20px' }} src={phone} alt="" />
                    <Typography fontSize='20px' maxWidth='45%' style={{ wordWrap: "break-word" }}>{state.phone_number}</Typography>
                </Box>
            </Box>
            <Typography color='#F93B1D' fontWeight='700' fontSize='22px'>ჩემ შესახებ</Typography>
            <Box display='flex' flexDirection='column' maxWidth='60%'>
                <Typography fontSize='15px' fontWeight='400' style={{ wordWrap: "break-word" }}>{state.about_me}</Typography>
            </Box>
            <img src={smallLine} alt="" style={{ width: '90%' }} />

        </Box>

        </Box>
    )
}

export default FinishedResume