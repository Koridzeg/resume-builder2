import { Box } from '@mui/material'
import React from 'react'
import redberryLogo from '../images/logo.png'
import line from '../images/line.png'
import backgroundImg from '../images/backgroundimg.png'
import Button from '@mui/material/Button'
import backgroundLogo from '../images/backgroundlogo.png'
import { useNavigate } from 'react-router-dom'

const Landing: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Box display='flex'
            flexDirection='column'
            height='100%'
            width='100vw'
            style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Box display='flex'
                gap='1rem'
                flexDirection='column'
                height='100px'
                marginTop='1.5rem'
                marginLeft='4rem'>
                <img src={redberryLogo} alt="logo" style={{ width: '236px', height: '38px' }} />
                <img src={line} alt="line" style={{ width: '1780px', height: '1px' }} />
            </Box>
            <Box display='flex'
                width='100%'
                height='100%'
                justifyContent='center'
                alignItems='center'
            >

                <Button variant='outlined' style={{ width: '400px', backgroundColor: 'black', color: 'white', fontSize: '20px', zIndex: '1' }} onClick={() => {
                    navigate('/create')
                }}> რეზიუმეს დამატება </Button>
                <img src={backgroundLogo} alt="bgLogo" style={{ position: 'absolute', right: '30%', bottom: '20%' }} />
            </Box>

        </Box>

    )
}

export default Landing