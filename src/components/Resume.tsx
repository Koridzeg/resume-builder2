import { Box, Typography } from '@mui/material'
import mail from '../images/mail.png'
import phone from '../images/phone.png'
import smallLine from '../images/smallline.png'
import { WizardFormData } from '../types'
import test from "../images/test.png"
import React from 'react'
import rlogo from "../images/rlogo.png"

type ResumeProps = {
    formData: WizardFormData
}

const Resume: React.FC<ResumeProps> = ({ formData }) => {


    return (
        <Box display='flex' height='100%' gap='1.5rem' flexDirection='column' paddingLeft='6em' paddingTop='3.5em' sx={{ whiteSpace:'pre-wrap' }} >
            {formData.image && (
                <img src={formData.image} alt="" style={{ width: '246px', height: '246px', position: 'absolute', left: '82%', borderRadius: '133px' }} />
            )}
            <Box display='flex' gap='1.5em' maxWidth='80%' flexDirection='row'>
                <Typography color='#F93B1D' fontWeight='bold' fontSize='36px' maxWidth='40%' style={{ wordWrap: "break-word" }}>{formData.name}</Typography>
                <Typography color='#F93B1D' fontWeight='700' fontSize='36px' maxWidth='40%'  style={{ wordWrap: "break-word" }}>{formData.surname}</Typography>
            </Box>
            <Box display='flex' paddingLeft='0.5em' flexDirection='column' gap='1rem'>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center' maxWidth='65%'>
                    <img style={{ width: '20px', height: '20px' }} src={mail} alt="" />
                    <Typography fontSize='20px' maxWidth='65%' style={{ wordWrap: "break-word" }}>{formData.email}</Typography>
                </Box>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{ width: '20px', height: '20px' }} src={phone} alt="" />
                    <Typography fontSize='20px' maxWidth='45%' style={{ wordWrap: "break-word" }}>{formData.phone_number}</Typography>
                </Box>
            </Box>
            <Typography color='#F93B1D' fontWeight='700' fontSize='28px'>ჩემ შესახებ</Typography>
            <Box display='flex' flexDirection='column' maxWidth='70%'>
                <Typography fontSize='19px' fontWeight='400' maxWidth='100%' style={{ wordWrap: "break-word" }}>{formData.about_me}</Typography>
            </Box>
            <img src={smallLine} alt="" style={{ maxWidth: '90%' }} />
            <Typography fontWeight='700' fontSize='28px' color='#F93B1D'>გამოცდილება</Typography>
            {formData.experiences.map((experience, index) => (
                <React.Fragment key={index}>
                    <Box display='flex' flexDirection='row' gap='1em' maxWidth='45%'>
                        <Typography fontWeight='700' color='#1A1A1A' maxWidth='65%' style={{ wordWrap: "break-word" }} >{experience.position}</Typography>
                        <Typography fontWeight='700' color='#1A1A1A' maxWidth='65%' style={{ wordWrap: "break-word" }} >{experience.employer}</Typography>
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
                    <Box display='flex' width='500px' flexDirection='column'>
                        <Typography width='100%' style={{ wordWrap: "break-word" }}>{experience.description}</Typography>
                    </Box>
                </React.Fragment>
            ))}
            <img src={smallLine} alt="" style={{ width: '90%' }} />
            <Typography fontWeight='700' fontSize='28px' color='#F93B1D'>განათლება</Typography>
            {formData.educations.map((edu, idx) => (
                <React.Fragment key={idx}>
                    <Box display='flex' maxWidth='45%'>
                    <Typography fontWeight='700' color='#1A1A1A' style={{ wordWrap: "break-word" }} >{edu.institute}</Typography>
                    </Box>
                    <Box display='flex' maxWidth='45%'>
                        {edu.due_date ? new Date(edu.due_date).toISOString().substring(0,10) : ''} 
                    </Box>
                    <Box display='flex' maxWidth='500px'>
                    <Typography fontSize='16px' fontWeight='400' width='100%' style={{ wordWrap: "break-word" }}>{edu.description}</Typography>
                    </Box>
                </React.Fragment>
            ))}
            <img src={rlogo} alt="sadasdasdasdsadasdd" style={{position:'absolute',width:'40px',height:'40px',bottom:'5%',right:'39%'}} />
        </Box>
    )
}

export default Resume