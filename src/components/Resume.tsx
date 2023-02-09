import { Box, Typography } from '@mui/material'
import mail from '../images/mail.png'
import phone from '../images/phone.png'


const Resume = () => {




    return (
        <Box display='flex' height='100%' width='45%' gap='1.5rem' flexDirection='column' paddingLeft='5em' paddingTop='3.5em'>
            <Box display='flex' flexDirection='row' gap='1.5em'>
                <Typography color='#F93B1D' fontWeight='700' fontSize='34px'>{localStorage.getItem('სახელი')}</Typography>
                <Typography color='#F93B1D' fontWeight='700' fontSize='34px'>{localStorage.getItem('გვარი')}</Typography>
            </Box>
            <Box display='flex' paddingLeft='0.5em' flexDirection='column' gap='1rem'>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{width:'20px',height:'20px'}} src={mail} alt="" />
                    <Typography fontSize='20px'>{localStorage.getItem('ელ.ფოსტა')}</Typography>
                </Box>
                <Box display='flex' gap='1rem' flexDirection='row' alignItems='center'>
                    <img style={{width:'20px',height:'20px'}} src={phone} alt="" />
                    <Typography fontSize='20px'>{localStorage.getItem('მობილურის ნომერი')}</Typography>
                </Box>
            </Box>
            <Typography color='#F93B1D' fontWeight='700' fontSize='30px'>ჩემ შესახებ</Typography>
            <Box display='flex' flexDirection='column' width='40%'>
            <Typography>{localStorage.getItem('aboutUs')}</Typography>
            </Box>
        </Box>
    )
}

export default Resume