import { Box, Typography } from '@mui/material'
import mail from '../images/mail.png'
import phone from '../images/phone.png'
import smallLine from '../images/smallline.png'
import { WizardFormData } from '../types'


type ResumeProps = {
    formData: WizardFormData
}

const Resume: React.FC<ResumeProps> = ({ formData }) => {


    return (
        <Box display='flex' height='100%' width='45%' gap='1.5rem' flexDirection='column' paddingLeft='5em' paddingTop='3.5em'>
            <Box display='flex' flexDirection='row' gap='1.5em'>
                <Typography color='#F93B1D' fontWeight='700' fontSize='34px'>{formData.name}</Typography>
                <Typography color='#F93B1D' fontWeight='700' fontSize='34px'>{formData.surname}</Typography>
            </Box>
            <Box display='flex' paddingLeft='0.5em' flexDirection='column' gap='1rem'>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{ width: '20px', height: '20px' }} src={mail} alt="" />
                    <Typography fontSize='20px'>{formData.email}</Typography>
                </Box>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{ width: '20px', height: '20px' }} src={phone} alt="" />
                    <Typography fontSize='20px'>{formData.number}</Typography>
                </Box>
            </Box>
            <Typography color='#F93B1D' fontWeight='700' fontSize='28px'>ჩემ შესახებ</Typography>
            <Box display='flex' flexDirection='column' width='40%'>
                <Typography>{formData.aboutMe}</Typography>
            </Box>
            <img src={smallLine} alt="" style={{ width: '90%' }} />
            <Typography fontWeight='700' fontSize='28px' color='#F93B1D'>გამოცდილება</Typography>
            <Box>
                {/* <Typography>{secondFormData.position}</Typography>
                <Typography>{secondFormData.employer}</Typography> */}
            </Box>
        </Box>
    )
}

export default Resume