import { Box, Typography } from '@mui/material'
import mail from '../images/mail.png'
import phone from '../images/phone.png'
import smallLine from '../images/smallline.png'
import { WizardFormData } from '../types'
import test from "../images/test.png"
import React from 'react'

type ResumeProps = {
    formData: WizardFormData
}

const Resume: React.FC<ResumeProps> = ({ formData }) => {

    console.log(formData)


    return (
        <Box display='flex' height='100%' width='45%' gap='1.5rem' flexDirection='column' paddingLeft='6em' paddingTop='3.5em'>
            {formData.image && (
                <img src={formData.image} alt="" style={{ width: '246px', height: '246px', position: 'absolute', left: '82%', borderRadius: '133px' }} />
            )}
            <Box display='flex' flexDirection='row' gap='1.5em'>
                <Typography color='#F93B1D' fontWeight='bold' fontSize='36px'>{formData.name}</Typography>
                <Typography color='#F93B1D' fontWeight='700' fontSize='36px'>{formData.surname}</Typography>
            </Box>
            <Box display='flex' paddingLeft='0.5em' flexDirection='column' gap='1rem'>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{ width: '20px', height: '20px' }} src={mail} alt="" />
                    <Typography fontSize='20px'>{formData.email}</Typography>
                </Box>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{ width: '20px', height: '20px' }} src={phone} alt="" />
                    <Typography fontSize='20px'>{formData.phone_number}</Typography>
                </Box>
            </Box>
            <Typography color='#F93B1D' fontWeight='700' fontSize='28px'>ჩემ შესახებ</Typography>
            <Box display='flex' flexDirection='column' width='65%'>
                <Typography fontSize='19px' fontWeight='400'>{formData.about_me}</Typography>
            </Box>
            <img src={smallLine} alt="" style={{ width: '90%' }} />
            <Typography fontWeight='700' fontSize='28px' color='#F93B1D'>გამოცდილება</Typography>
            {formData.experiences.map((experience, index) => (
                <React.Fragment key={index}>
                    <Box display='flex' flexDirection='row' gap='1em'>
                        <Typography fontWeight='700' color='#1A1A1A' >{experience.position}</Typography>
                        <Typography fontWeight='700' color='#1A1A1A'>{experience.employer}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' gap='1em'>
                        <Typography fontSize='16px' color='#909090'>
                            {experience.start_date ? new Date(experience.start_date).toISOString().substring(0, 10) : ""}
                            &nbsp;
                            -
                            &nbsp;
                            {experience.due_date ? new Date(experience.due_date).toISOString().substring(0, 10) : ""}
                        </Typography>
                    </Box>
                </React.Fragment>
            ))}
        </Box>
    )
}

export default Resume