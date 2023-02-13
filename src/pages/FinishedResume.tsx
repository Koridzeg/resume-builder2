import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import phone from '../images/phone.png'
import mail from '../images/mail.png'
import smallLine from '../images/smallline.png'
import rlogo from '../images/rlogo.png'
import backward from "../images/back.png"
import deletecross from "../images/delete.png"

const FinishedResume = () => {
    const [message, setMessage] = useState(true)
    const location = useLocation();
    const navigate = useNavigate()

    // Access the state from location.state
    const state = location.state;
    return (
        <Box display='flex' minHeight='100vh' justifyContent='center' alignItems='center' >
            <Box display='flex' width='822px' height='900px' padding='5em' gap='1em' border='1px solid black' flexDirection='column' marginBottom='3em'>
                <IconButton onClick={() => {
                    navigate('/')
                }} style={{ height: '60px', width: '60px', position: 'absolute', right: '95%', top: '5%' }}>
                    <img src={backward} alt="asdasdad" />
                </IconButton>
                <Box display={message ? 'block' : 'none'} position='absolute' top='53px' right='70px' width='427px' height='167px' padding='30px 40px' border='1px solid #e4e4e4' boxShadow='0px 4px 28px rgba(0,0,0,0.25)' borderRadius='8px'>
                    <Typography fontSize='28px' color='#1A1A1A' fontWeight='700'>რეზიუმე წარმატებით გაიგზავნა  🎉</Typography>
                    <IconButton onClick={() => {
                        setMessage(false)
                    }}><img src={deletecross} alt="" style={{ position: 'absolute', bottom: '100px', left: '350px' }} /></IconButton>
                </Box>
                <Box display='flex' justifyContent='flex-start' gap='1em'>
                    <img src={"https://resume.redberryinternship.ge" + state.image} style={{ width: '246px', height: '246px', position: 'absolute', left: '56%', borderRadius: '133px', bottom: '65%' }} alt="asdasdasdasdas" />
                    <Typography fontSize='34px' color='#F93B1D' fontWeight='700'>{state.name}</Typography>
                    <Typography fontSize='34px' color='#F93B1D' fontWeight='700'>{state.surname}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' gap='0.5em'>
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
                <img src={smallLine} alt="" style={{ width: '95%' }} />
                <Typography fontWeight='700' fontSize='22px' color='#F93B1D'>გამოცდილება</Typography>
                {state.experiences.map((experience: any, index: any) => (
                    <React.Fragment key={index}>
                        <Box display='flex' flexDirection='row' gap='1em' maxWidth='45%'>
                            <Typography fontWeight='700' color='#1A1A1A' style={{ wordWrap: "break-word" }} >{experience.position}</Typography>
                            <Typography fontWeight='700' color='#1A1A1A' style={{ wordWrap: "break-word" }} >{experience.employer}</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row' gap='1em' maxWidth='45%'>
                            <Typography fontSize='16px' color='#909090' style={{ wordWrap: "break-word" }}>
                                {experience.start_date ? new Date(experience.start_date).toISOString().substring(0, 10) : ""}
                                &nbsp;
                                -
                                &nbsp;
                                {experience.due_date ? new Date(experience.due_date).toISOString().substring(0, 10) : ""}
                            </Typography>
                        </Box>
                        <Box display='flex' maxWidth='45%'>
                            <Typography fontSize='16px'>{experience.description}</Typography>
                        </Box>
                    </React.Fragment>
                ))}
                <img src={smallLine} alt="" style={{ width: '95%' }} />
                <Typography fontWeight='700' fontSize='22px' color='#F93B1D'>განათლება</Typography>
                {state.educations.map((edu: any, idx: any) => (
                    <React.Fragment key={idx}>
                        <Box display='flex' maxWidth='45%'>
                            <Typography fontWeight='700' color='#1A1A1A' style={{ wordWrap: "break-word" }} >{edu.institute}</Typography>
                        </Box>
                        <Box display='flex' maxWidth='45%'>
                            <Typography color='#909090' fontSize='16px' style={{ wordWrap: 'break-word' }}>
                                {edu.due_date ? new Date(edu.due_date).toISOString().substring(0, 10) : ''}
                            </Typography>
                        </Box>
                        <Box display='flex' maxWidth='45%'>
                            <Typography fontSize='16px' fontWeight='400' style={{ wordWrap: "break-word" }}>{edu.description}</Typography>
                        </Box>
                    </React.Fragment>
                ))}
                <img src={rlogo} alt='logo' style={{ width: '40px', height: '40px', position: 'absolute', bottom: '15%' }} />
            </Box>

        </Box>
    )
}

export default FinishedResume