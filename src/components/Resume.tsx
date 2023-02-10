import { Box, Typography } from '@mui/material'
import mail from '../images/mail.png'
import phone from '../images/phone.png'
import smallLine from '../images/smallline.png'
import { WizardFormData } from '../types'


type ResumeProps = {
    formData: WizardFormData
}

const Resume: React.FC<ResumeProps> = ({ formData }) => {

    console.log(formData)

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
            <Box display='flex' flexDirection='row' gap='1em'>
                <Typography fontWeight='700' color='#1A1A1A' >{formData.position},</Typography>
                <Typography fontWeight='700' color='#1A1A1A'>{formData.employer}</Typography>
            </Box>
            <Box display='flex' flexDirection='row' gap='1em'>
                <Typography fontWeight='700' color='#1A1A1A' >,</Typography>
                <Typography fontWeight='700' color='#1A1A1A'></Typography>
            </Box>
            {formData.image && formData.image.length > 0 && (
                <img src={URL.createObjectURL(formData.image[0])} alt="" />
            )}
        </Box>
    )
}

export default Resume